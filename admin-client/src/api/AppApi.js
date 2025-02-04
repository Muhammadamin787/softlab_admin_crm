import HttpClient from "../utils/HttpClient";
import {api} from './api'


// export const downloadFileAction = (data) => () => {
//     let link = document.createElement("a")
//     link.href = (config.BASE_URL + "/excel/download/student.xlsx")
//     // link.setAttribute("download", "student.xlsx")
//     document.body.appendChild(link)
//     link.click();
// }

export const getExcelListApp = (data) => {
    return HttpClient.doGet(api.accountant + (data && data.startDate && data.finishDate != null ? "?startDate=" + data.startDate
        + "&finishDate=" + data.finishDate : ""))
}

export const getAttendanceListAppApi = (data) => {
    return HttpClient.doGet(api.attendance + "/" + data)
}
export const saveAttendanceAppApi = (data) => {
    return HttpClient.doPost(api.attendance, data)
}

//client
export const saveClientApi = (data) => {
    return HttpClient.doPost(api.client, data)
}
export const editClientApi = (data) => {
    return HttpClient.doPut(api.client + "/" + data.id, data)
}
export const deleteClientApi = (data) => {
    return HttpClient.doDelete(api.client + "/" + data.id)
}
export const getClientList = () => {
    return HttpClient.doGet(api.client)
}


// Room Start
export const saveRoomApi = (data) => {
    return HttpClient.doPost(api.room, data)
}
export const getRoomList = () => {
    return HttpClient.doGet(api.room)
}
export const editRoomApi = (data) => {
    return HttpClient.doPut(api.room + "/" + data.id, data)
}
export const deleteRoomApi = (data) => {
    return HttpClient.doDelete(api.room + "/" + data)
}
// Room End

// Cashback Start
export const saveCashbackApi = (data) => {
    return HttpClient.doPost(api.cashback, data)
}
export const getCashbackList = () => {
    return HttpClient.doGet(api.cashback)
}
export const editCashbackApi = (data) => {
    return HttpClient.doPut(api.cashback + "/" + data.id, data)
}
export const deleteCashbackApi = (data) => {
    return HttpClient.doDelete(api.cashback + "/" + data)
}
// Cashback End

// PayType
export const savePayTypeApi = (data) => {
    return HttpClient.doPost(api.payType, data)
}
export const getPayTypeList = () => {
    return HttpClient.doGet(api.payType)
}
export const editPayTypeApi = (data) => {
    return HttpClient.doPut(api.payType + "/" + data.id, data)
}
export const deletePayTypeApi = (data) => {
    return HttpClient.doDelete(api.payType + "/" + data)
}
// PayType End


//Reklama

export const saveReklamaApi = (data) => {
    console.log(data)
    return HttpClient.doPost(api.reklama, data)
}
export const editReklamaApi = (data) => {
    return HttpClient.doPut(api.reklama + "/" + data.id, data)
}
export const deleteReklamaApi = (data) => {
    return HttpClient.doDelete(api.reklama + "/" + data.id)
}
export const getReklamaApi = () => {
    return HttpClient.doGet(api.reklama)
}
export const getReklamaForSelectApi = () => {
    return HttpClient.doGet(api.reklama + "/select")
}
//START CLIENT STATUS
export const getClientStatusListApi = () => {
    return HttpClient.doGet(api.clientStatus + "/list")
}
export const saveClientStatusApi = (data) => {
    return HttpClient.doPost(api.clientStatus, data)
}
export const editClientStatusApi = (data) => {
    if (data && data.id)
        return HttpClient.doPut(api.clientStatus + "/" + data.id, data)
}
export const deleteClientStatusApi = (data) => {
    if (data && data.id)
        return HttpClient.doDelete(api.clientStatus + "/" + data.id)
}
//FINISH CLIENT STATUS
// START DURATION TYPE
export const saveDurationTypeApi = (data) => {
    return HttpClient.doPost(api.durationType, data)
}
export const editDurationTypeApi = (data) => {
    return HttpClient.doPut(api.durationType + "/" + data.id, data)
}
export const getDurationTypesApi = () => {
    return HttpClient.doGet(api.durationType)
}
export const deleteDurationTypeApi = (data) => {
    return HttpClient.doDelete(api.durationType + "/" + data.id)
}
// END DURATION TYPE

// START COURSE API
export const saveCourseApi = (data) => {
    return HttpClient.doPost(api.course, data)
}
export const editCourseApi = (data) => {
    return HttpClient.doPut(api.course + "/" + data.id, data)
}
export const getCoursesApi = (data) => {
    return HttpClient.doGet(api.course + (data && data.id ? "?categoryId=" + data.id : ""))
}
export const getCourseListForSelectApi = () => {
    return HttpClient.doGet(api.course);
}
export const getCourseApi = (data) => {
    return HttpClient.doGet(api.course + (data && data.id ? "/" + data.id : ""))
}
export const deleteCourseApi = (data) => {
    return HttpClient.doDelete(api.course + "/" + data.id)
}
// END COURSE API

// START REGION TYPE
export const saveRegionApi = (data) => {
    return HttpClient.doPost(api.region, data)
}
export const editRegionApi = (data) => {
    return HttpClient.doPut(api.region + "/" + data.id, data)
}
export const getRegionApi = () => {
    return HttpClient.doGet(api.region)
}
export const getRegionSearchApi = (data) => {
    return HttpClient.doGet(api.region + "/search?key=" + data.key)
}
export const deleteRegionApi = (data) => {
    return HttpClient.doDelete(api.region + "/" + data.id)
}
// END REGION
// START GROUP API
export const getGroupsApi = (data) => {
    return HttpClient.doGet(api.group + (data && data.page != null && data.size ? "?page=" + data.page
        + "&size=" + data.size + "&status=" + data.type : ""))
}
export const getGroupsForSelectApi = () => {
    return HttpClient.doGet(api.group + "/select")
}
export const getGroupApi = (data) => {
    return HttpClient.doGet(api.group + (data && data.id ? "/" + data.id : ""))
}
export const getGroupStudentsApi = (data) => {
    return HttpClient.doGet(api.student + "/groupStudent/" + (data && data.id))
}
export const saveGroupApi = (data) => {
    return HttpClient.doPost(api.group, data)
}
export const changeStudentGroupStatusApi = (data) => {
    return HttpClient.doPatch(api.student + "/changeGroupStatus", data)
}
export const changeGroupAPi = (data) => {
    return HttpClient.doGet(api.group + "/changeStatus?groupId=" + data.groupId + "&status=" + data.status)
}
export const editGroupApi = (data) => {
    if (data && data.id)
        return HttpClient.doPut(api.group + "/" + data.id, data)
    else return null
}
export const deleteGroupApi = (data) => {
    return HttpClient.doDelete(api.group + "/" + data.id)
}
// FINISH GROUP API
//// For Profession

export const saveProfessionApi = (data) => {
    return HttpClient.doPost(api.profession, data)
}
export const editProfessionApi = (data) => {
    return HttpClient.doPut(api.profession + "/" + data.id, data)
}
export const getProfessionApi = () => {
    return HttpClient.doGet(api.profession + "/")
}
export const deleteProfessionsApi = (data) => {
    return HttpClient.doDelete(api.profession + "/" + data)
}


/// For Category Api
export const saveTestCategoryApi = (data) => {
    return HttpClient.doPost(api.testCategory, data)
}
export const editTestCategoryApi = (data) => {
    return HttpClient.doPut(api.testCategory + "/" + data.id, data)
}
export const getTestCategoryApi = () => {
    return HttpClient.doGet(api.testCategory + "/")
}
export const deleteTestCategoryApi = (data) => {
    return HttpClient.doDelete(api.testCategory + "/" + data)
}

// For Course Category

export const saveCourseCategoryApi = (data) => {
    return HttpClient.doPost(api.courseCategory, data)
}
export const editCourseCategoryApi = (data) => {
    return HttpClient.doPut(api.courseCategory + "/" + data.id, data)
}
export const getCourseCategoriesApi = (data) => {
    return HttpClient.doGet(api.courseCategory + (data && data.id ? "?id=" + data.id : ""))
}
export const getCourseCategoryApi = (data) => {
    return HttpClient.doGet(api.courseCategory + (data && data.id ? "/" + data.id : ""))
}
export const deleteCourseCategoryApi = (data) => {
    return HttpClient.doDelete(api.courseCategory + "/" + data.id)
}

// Start Trial Contact Type
export const saveTrialContactTypeApi = (data) => {
    return HttpClient.doPost(api.trialContactType, data)
}
export const editTrialContactTypeApi = (data) => {
    return HttpClient.doPut(api.trialContactType + "/" + data.id, data)
}
export const getTrialContactTypesApi = () => {
    return HttpClient.doGet(api.trialContactType)
}
export const deleteTrialContactTypeApi = (data) => {
    return HttpClient.doDelete(api.trialContactType + "/" + data.id)
}

// End Trial Contact Type

// Attachment CRUD Start
export const uploadFileAppApi = (data) => {
    return HttpClient.doPost(api.addAttachment, data);
};

export const getFileAppApi = (data) => {
    return HttpClient.doGet(api.getAttachment + "/" + data);
};
// Attachment CRUD End


// START STUDENT API
export const getDebtorsAPI = (data) => {
    return HttpClient.doGet(api.debtors + "?page=" + data.page + "&size=" + data.size)
}

export const saveStudentApi = (data) => {
    return HttpClient.doPost(api.student, data)
}
export const editStudentApi = (data) => {
    return HttpClient.doPut(api.student + "/" + data.id, data)
}
export const getStudentsApi = (data) => {
    return HttpClient.doGet(api.student + (data && data.page != null && data.size ? "?page=" + data.page
        + "&size=" + data.size + "&status=" + data.type : ""))
}

export const getStudentByGroupApi = (data) => {
    return HttpClient.doGet(api.student + "/groupStudent/" + data)
}
export const getStudentApi = (data) => {
    return HttpClient.doGet(api.student + "/" + data.id)
}
export const deleteStudentApi = (data) => {
    return HttpClient.doDelete(api.student + "/" + data.id)
}
export const studentAddGroup = (data) => {
    return HttpClient.doPost(api.group + "/addStudent", data)
}
export const getStudentPaymentApi = (data) => {
    return HttpClient.doGet(api.studentPayment + "/" + data)
}
export const getStudentGroupsApi = (data) => {
    return HttpClient.doGet(api.studentPayment + "/studentGroup/" + data)
}
export const changeStatusApi = (data) => {
    return HttpClient.doGet(api.student + "/changeStatus?studentId=" + data.studentId + "&status=" + data.status)
}
export const changeTeacherStatusApi = (data) => {
    return HttpClient.doGet(api.teacher + "/changeStatus?teacherId=" + data.teacherId + "&status=" + data.status)
}

// FINISH STUDENT API

// START STUDENT PAYMENT API
export const saveStudentPaymentApi = (data) => {
    return HttpClient.doPost(api.studentPayment + "/" + data.studentId, data)
}
export const editStudentPaymentApi = (data) => {
    return HttpClient.doPut(api.studentPayment + "/" + data.id, data)
}
export const deleteStudentPaymentApi = (data) => {
    return HttpClient.doDelete(api.studentPayment + "/" + data.id)
}

export const getStudentPaymentListByDateApi = (data) => {
    return HttpClient.doGet(api.studentPayment + "/byDate" + (data && data.page != null && data.size ? "?page=" + data.page
        + "&size=" + data.size + "&date1=" + data.date1 + "&date2=" + data.date2 + "&type=" + data.type : ""))
}
export const getTeacherPaymentListByDateApi = (data) => {
    return HttpClient.doGet(api.teacherSalary + "/byDate" + (data && data.page != null && data.size ? "?page=" + data.page
        + "&size=" + data.size + "&date1=" + data.date1 + "&date2=" + data.date2 + "&type=" + data.type : ""))
}

export const getFinanceStudentApi = (data) => {
    return HttpClient.doGet(api.studentPayment + "/finance" + (data && data.page != null && data.size ? "?page=" + data.page
        + "&size=" + data.size + "&type=" + data.type : ""))
}
export const getFinanceTeacherApi = (data) => {
    return HttpClient.doGet(api.teacherSalary + "/finance" + (data && data.page != null && data.size ? "?page=" + data.page
        + "&size=" + data.size + "&type=" + data.type : ""))
}


// FINISH STUDENT PAYMENT API

// START TEACHER API
export const saveTeacherApi = (data) => {
    return HttpClient.doPost(api.teacher, data)
}
export const editTeacherApi = (data) => {
    return HttpClient.doPut(api.teacher + "/" + data.id, data)
}

export const getTeachersApi = (data) => {
    return HttpClient.doGet(api.teacher + (data && data.page != null && data.size ? "?page=" + data.page
        + "&size=" + data.size + "&status=" + data.type : ""))
}
export const getTeachersForSelectApi = () => {
    return HttpClient.doGet(api.teacher + "/select")
}
export const getTeacherApi = (data) => {
    return HttpClient.doGet(api.teacher + "/" + (data && data.id))
}
export const getTeacherGroupsApi = (data) => {
    return HttpClient.doGet(api.teacher + "/getGroups/" + (data && data.id))
}
export const deleteTeacherApi = (data) => {
    return HttpClient.doDelete(api.teacher + "/" + data.id)
}

// FINISH TEACHER API

export const editStudentStatusApi = (data) => {
    return HttpClient.doDelete(api.student + "/" + data.id, data)
}

// START APPEAL API
export const saveAppealApi = (data) => {
    return HttpClient.doPost(api.appeal, data)
}
export const makeStudentByAppealApi = (data) => {
    return HttpClient.doGet(api.appeal + "/makeStudent/" + data.id, data)
}
export const editAppealApi = (data) => {
    return HttpClient.doPut(api.appeal + "/" + data.id, data)
}
export const changeAppealEnumTypeApi = (data) => {
    if (data && data.id)
        return HttpClient.doPut(api.appeal + "/changeType/" + data.id, data)
}
export const getAppealListByEnumTypeApi = (data) => {
    return HttpClient.doGet(api.appeal + "?enumType=" + data.enumType + "&page=" + data.page + "&size=" + data.size)
}
export const getAppealListAllApi = (data) => {
    return HttpClient.doGet(api.appeal + "/all")
}
export const getOneAppealApi = (data) => {
    return HttpClient.doGet(api.appeal + "/" + data.id)
}
export const getOneAppealForEditApi = (data) => {
    return HttpClient.doGet(api.appeal + "/edit/" + data.id)
}
export const deleteOneAppealApi = (data) => {
    return HttpClient.doDelete(api.appeal + "/" + data.id)
}
export const getAppealListByStatusTypeApi = (data) => {
    return HttpClient.doGet(api.appeal + "?enumType=" + data.enumType + "&typeId=" + data.typeId + "&page=" + data.page + "&size=" + data.size)
}
// FINISH APPEAL API

// START TOPLAM API
export const saveToplamApi = (data) => {
    return HttpClient.doPost(api.toplam, data)
}
export const makeGroupByToplamApi = (data) => {
    return HttpClient.doPost(api.toplam + "/makeGroup/" + data.id, data)
}
export const editToplamApi = (data) => {
    return HttpClient.doPut(api.toplam + "/" + data.id, data)
}
export const getToplamListApi = (data) => {
    return HttpClient.doGet(api.toplam + "?page=" + data.page + "&size=" + data.size)
}
export const getToplamApi = (data) => {
    return HttpClient.doGet(api.toplam + "/" + data.id)
}
export const deleteToplamApi = (data) => {
    return HttpClient.doDelete(api.toplam + "/" + data.id)
}
export const getToplamListForSelectApi = () => {
    return HttpClient.doGet(api.toplam + "/select")
}
// FINISH TOPLAM API

// START TEACHER SALARY
export const giveSalaryApi = (data) => {
    return HttpClient.doPost(api.teacherSalary, data)
}
export const giveTeacherSalaryApi = (data) => {
    return HttpClient.doPost(api.salary + "/" + data.teacherId, data)
}
export const getTeacherSalaryApi = (data) => {
    return HttpClient.doGet(api.teacherSalary + "/" + data.id + "?page=" + data.page + "&size=" + data.size)
}
export const editTeacherSalaryApi = (data) => {
    return HttpClient.doPut(api.teacherSalary + "/" + data.id, data)
}

export const deleteTeacherSalaryApi = (data) => {
    return HttpClient.doDelete(api.teacherSalary + "/" + data);
}
export const getTeacherSalaryAppApi = () => {
    return HttpClient.doGet(api.teacherSalary)
}
// FINISH TEACHER SALARY

// START SCHEDULE

export const getDailyScheduleList = (data) => {
    return HttpClient.doGet(api.group + "/schedule/" + data);
}

export const getWeeklyScheduleList = () => {
    return HttpClient.doGet(api.group + "/schedule");
}

// END SCHEDULE

// START DASHBOARD API
export const getDashboardStatApi = () => {
    return HttpClient.doGet(api.dashboard + "/stat")
}
export const getDashboardStudentStatApi = () => {
    return HttpClient.doGet(api.dashboard + "/student")
}
//  FINISH DASHBOARD API

// START GET GROUPS OF COURSE

export const getByCourseApi = (data) => {
    return HttpClient.doGet(api.course + "/byCource/" + data)
}

// FINISH GET GROUPS OF COURSE

// START SEARCH STUDENT
export const searchStudentApi = (data) => {
    return HttpClient.doGet(api.searchStudent + (data && data.name != null ? "?name=" + data.name : ""))
}
// FINISH SEARCH STUDENT

// START EMPLOYEE
export const saveEmployeeApi = (data) => {
    return HttpClient.doPost(api.employee, data)
}
export const editEmployeeApi = (data) => {
    return HttpClient.doPut(api.employee + "/" + data.id, data)
}
export const getEmployeeApi = (data) => {
    return HttpClient.doGet(api.employee + "/" + data.id)
}

export const getEmployeeListApi = (data) => {
    return HttpClient.doGet(api.employee + (data && data.page != null && data.size ? "?page=" + data.page
        + "&size=" + data.size : ""))
}

export const deleteEmployeeApi = (data) => {
    return HttpClient.doDelete(api.employee + "/" + data.id)
}
// FINSIH EMPLOYEE

// Written by Muhammadamin
export const getStudentOnSearchApi = (data) => {
    return HttpClient.doGet(api.searchStudent + (data && data.name != null ? "?name=" + data.name + "&groupId=" + data.id : ""))
}
export const saveStudentToGroupApi = (data) => {
    console.log(data);
    return HttpClient.doPost(api.group + "/addStudent", data)
}

export const getStudentsBySearchApi = (data) => {
    return HttpClient.doGet(api.student + "/searchAll" + (data && data.name != null ? "?name=" + data.name : ""))
}
export const getTeachersBySearchApi = (data) => {
    return HttpClient.doGet(api.teacher + "/searchAll" + (data && data.name != null ? "?name=" + data.name : ""))
}
// ---