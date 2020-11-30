import { ShowMessageComponent } from "./../Dashboard/shared/show-message/show-message.component";
import { MessageService } from "primeng/api";
import { NgxSpinnerService } from "ngx-spinner";
import { Router } from "@angular/router";
import { Injectable } from "@angular/core";
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { AuthenticationService } from "./auth.service";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    showMessageComponent: ShowMessageComponent = new ShowMessageComponent(
        this.messageService
    );
    constructor(
        private authenticationService: AuthenticationService,
        private spinner: NgxSpinnerService,
        private messageService: MessageService,
        private router: Router
    ) {}

    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            catchError((err) => {
                if (err.status === 401) {
                    // auto logout if 401 response returned from api
                    this.authenticationService.logout();
                    if (this.router.url !== "/login") {
                        location.reload(true);
                    }
                } else if (err.status === 500 || err.status === 0) {
                    this.spinner.hide();
                    this.showMessageComponent.showMessage(
                        "error",
                        "Internal server error",
                        "An error occured while processing your request. Please Contact the system administrator."
                    );
                    console.log("Internal Server Error");
                } else if (err.status === 403) {
                    this.spinner.hide();
                    this.showMessageComponent.showMessage(
                        "error",
                        "Unauthorized",
                        "You are not authorized to perform this operation."
                    );
                    console.log("Internal Server Error");
                }
                // else {
                //     this.spinner.hide();
                //     this.callSwal(
                //         "Connection Error",
                //         "Please check your connection and try again",
                //         "error"
                //     );
                //     console.log("All Other Errors");
                // }
                // const error = err.error.message || err.statusText;
                return throwError(err);
            })
        );
    }
}
