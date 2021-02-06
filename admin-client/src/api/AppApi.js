import HttpClient from "../utils/HttpClient";
import {api} from './api'


//Reklama

export const saveReklamaApi = (data) => {
    return HttpClient.doPost(api.reklama,data)
}
export const editReklamaApi = (data) => {
    return HttpClient.doPut(api.reklama +"/" +data.id,data)
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

// START COURSE
export const saveCourseApi = (data) => {
    return HttpClient.doPost(api.course, data)
}
export const editCourseApi = (data) => {
    return HttpClient.doPut(api.course + "/" + data.id, data)
}
export const getCoursesApi = () => {
    return HttpClient.doGet(api.course)
}
export const deleteCourseApi = (data) => {
    return HttpClient.doDelete(api.course + "/" + data.id)
}
// END DURATION TYPE

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
export const getCourseCategoriesApi = () => {
    return HttpClient.doGet(api.courseCategory)
}
export const deleteCourseCategoryApi = (data) => {
    return HttpClient.doDelete(api.courseCategory + "/" + data.id)
}

// Spec Start
export const saveSpecApi = (data) => {
    return HttpClient.doPost(api.spec, data)
}
export const getSpecList = () => {
    return HttpClient.doGet(api.spec)
}
export const editSpecApi = (data) => {
    return HttpClient.doPut(api.spec+"/"+data.id, data)
}
export const deleteSpecApi = (data) => {
    return HttpClient.doDelete(api.spec + "/" + data)
}
// Spec End

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
    return HttpClient.doGet(api.getAttachment+"/"+data);
};
// Attachment CRUD End


// Teacher Crud

export const saveTeacherApi = (data) => {
    return HttpClient.doPost(api.teacher,data)
}
export const editTeacherApi = (data) => {
    return HttpClient.doPut(api.teacher + "/" + data.id,data)
}
export const getTeacherApi = () => {
    return HttpClient.doGet(api.teacher)
}
export const deleteTeacherApi = (data) => {
    return HttpClient.doDelete(api.teacher + "/" +data.id)
}