import { PatientService } from "../services/patient.service";
export class SharedClass {
    constructor(private patientService: PatientService) {}
    async previewImage(event) {
        return new Promise((resolve) => {
            const fileData = event.files[0];
            const mimeType = fileData.type;
            if (mimeType.match(/image\/*/) == null) {
                return;
            }
            const reader = new FileReader();
            reader.readAsDataURL(fileData);
            reader.onload = (_event) => {
                resolve(reader.result);
            };
        });
    }
    formatBytes(bytes, decimals = 2) {
        if (bytes === 0) {
            return "0 Bytes";
        }
        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

        const i = Math.floor(Math.log(bytes) / Math.log(k));

        return (
            parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i]
        );
    }
    async searchTest(query, tests: any[], type): Promise<any[]> {
        return new Promise((resolve) => {
            const filtered: any[] = [];
            for (const item of tests) {
                if (
                    item[type].toLowerCase().indexOf(query.toLowerCase()) === 0
                ) {
                    filtered.push(item);
                }
            }
            resolve(filtered);
        });
    }
    getPatientReferralById(id) {
        return new Promise((resolve) => {
            this.patientService
                .getPatientReferralById(id)
                .subscribe((result) => {
                    resolve(result);
                });
        });
    }
    async checkLoggedInUserTeamWithPatient(LoggedInUser, patient) {
        const result = [];
        const patientTeams: any = await this.getPatientReferralById(patient.id);
        patientTeams.push(patient);
        patientTeams.forEach((element) => {
            if (LoggedInUser.teams.length > 0) {
                LoggedInUser.teams.forEach((team) => {
                    if (team.id === element.teamId) {
                        result.push(true);
                    }
                });
            }
        });
        if (result && result.length > 0) {
            return true;
        } else {
            return false;
        }
    }
    goToPatientPage(router) {
        router
            .navigateByUrl("/RefreshComponent", { skipLocationChange: true })
            .then(() => {
                router.navigate(["/dashboard/patient"]);
            });
    }
    goToDashboard(router) {
        router
            .navigateByUrl("/RefreshComponent", { skipLocationChange: true })
            .then(() => {
                router.navigate(["/dashboard"]);
            });
    }
    goToAddDiagnosis(router) {
        localStorage.setItem("sessionTypeId", JSON.stringify(0));
        router
            .navigateByUrl("/RefreshComponent", { skipLocationChange: true })
            .then(() => {
                router.navigate(["/dashboard/addDiagnosis"]);
            });
    }
    goToAddTreatment(router) {
        localStorage.setItem("sessionTypeId", JSON.stringify(1));
        router
            .navigateByUrl("/RefreshComponent", { skipLocationChange: true })
            .then(() => {
                router.navigate(["/dashboard/addTreatment"]);
            });
    }
    goToAddFollowup(router) {
        localStorage.setItem("sessionTypeId", JSON.stringify(2));
        router
            .navigateByUrl("/RefreshComponent", { skipLocationChange: true })
            .then(() => {
                router.navigate(["/dashboard/addFollowup"]);
            });
    }
    endSession(url, router) {
        if (url.includes("followup")) {
            router
                .navigateByUrl("/RefreshComponent", {
                    skipLocationChange: true,
                })
                .then(() => {
                    router.navigate(["/dashboard/addFollowup"]);
                });
        } else if (url.includes("treatment")) {
            router
                .navigateByUrl("/RefreshComponent", {
                    skipLocationChange: true,
                })
                .then(() => {
                    router.navigate(["/dashboard/addTreatment"]);
                });
        } else {
            router
                .navigateByUrl("/RefreshComponent", {
                    skipLocationChange: true,
                })
                .then(() => {
                    router.navigate(["/dashboard/addDiagnosis"]);
                });
        }
    }
    handleTestData(testParametersValues, parameters) {
        return new Promise((resolve) => {
            for (const element of parameters) {
                for (const item of testParametersValues) {
                    if (
                        element.name === item.parameterName &&
                        element.type === "table"
                    ) {
                        for (const cell of element.cells) {
                            if (
                                cell.name === item.subParameterName &&
                                item.ear === "left"
                            ) {
                                if (element.cellType === "boolean") {
                                    cell.left = {
                                        name: item.value,
                                    };
                                } else {
                                    cell.left = item.value;
                                }
                            }
                            if (
                                cell.name === item.subParameterName &&
                                item.ear === "right"
                            ) {
                                if (element.cellType === "boolean") {
                                    cell.right = {
                                        name: item.value,
                                    };
                                } else {
                                    cell.right = item.value;
                                }
                            }
                        }
                    }
                    if (
                        element.name === item.parameterName &&
                        element.type === "textarea"
                    ) {
                        element.textareaVal = item.value;
                    }
                    if (
                        element.name === item.parameterName &&
                        element.type === "list"
                    ) {
                        if (item.ear === "left") {
                            const found = element.values.filter(
                                (val) => val.name === item.value
                            );
                            element.leftVal = found[0];
                            element.showLeft = true;
                        }
                        if (item.ear === "right") {
                            const found = element.values.filter(
                                (val) => val.name === item.value
                            );
                            element.rightVal = found[0];
                            element.showRight = true;
                        }
                    }
                    if (
                        element.name === item.parameterName &&
                        element.type === "listWithImage"
                    ) {
                        if (item.ear === "left") {
                            const found = element.values.filter(
                                (val) => val.name === item.value
                            );
                            element.leftVal = found[0];
                            element.showLeft = true;
                        }
                        if (item.ear === "right") {
                            const found = element.values.filter(
                                (val) => val.name === item.value
                            );
                            element.rightVal = found[0];
                            element.showRight = true;
                        }
                    }
                    if (
                        element.type === "text" ||
                        element.type === "number" ||
                        element.type === "boolean" ||
                        element.type === "radio"
                    ) {
                        if (
                            element.name === item.parameterName &&
                            item.ear === "left"
                        ) {
                            element.leftVal = item.value;
                        }
                        if (
                            element.name === item.parameterName &&
                            item.ear === "right"
                        ) {
                            element.rightVal = item.value;
                        }
                    }
                }
            }
            resolve(parameters);
        });
    }
}
export class checkLoggedInUserTeamWithPatient {
    constructor() {}
    checkLoggedInUserTeamWithPatient;
}
