import HttpClient from "../utils/HttpClient";
import {api} from './api'


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
        + "&size=" + data.size : ""))
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
    return HttpClient.doPatch(api.student+"/changeGroupStatus", data)
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
export const saveStudentApi = (data) => {
    return HttpClient.doPost(api.student, data)
}
export const editStudentApi = (data) => {
    return HttpClient.doPut(api.student + "/" + data.id, data)
}
export const getStudentsApi = (data) => {
    return HttpClient.doGet(api.student + (data && data.page != null && data.size ? "?page=" + data.page
        + "&size=" + data.size : ""))
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

// FINISH STUDENT API

// START STUDENT PAYMENT API
export const saveStudentPaymentApi = (data) => {
    return HttpClient.doPost(api.studentPayment + "/" + data.studentId, data)
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
        + "&size=" + data.size : ""))
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