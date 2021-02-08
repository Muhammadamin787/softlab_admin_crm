import * as types from "../actionTypes/AppActionTypes";
import {createReducer} from "../../utils/StoreUtils";
import {toast} from "react-toastify";

const initState = {
    loading: false,
    durationTypes: [],
    secondPage: false,
    showModal: false,
    deleteModal: false,
    profession: [],
    regions: [],
    students: [],
    testCategory: [],
    reklamas: [],
    courseCategories: [],
    searchItems: [],
    getItems: [],
    size: 20,
    page: 0,
    totalElements: 0,
    totalPages: 0,
    parentItems: [],
    readModal: false,
    spec: [],
    attachmentId: '',
    arr: [{id: 1, values: []}],
    teachers: [],
    teacherDto: [],
    userDto: [],
    specialization: [],
    specializationDto: [],
    currentItem: []

};

const reducers = {
    [types.REQUEST_START](state) {
    },
    [types.REQUEST_ERROR](state) {
    },
    [types.REQUEST_SUCCESS](state) {
        state.loading = false
        state.showModal = false
        state.deleteModal = false
    },

    // Room
    [types.REQUEST_GET_ROOM_SUCCESS](state, payload) {
        state.rooms = payload.payload.object.sort((a, b) =>
            a.id > b.id ? 1 : b.id > a.id ? -1 : 0
        );
    },
    [types.REQUEST_SAVE_ROOM_SUCCESS](state, payload) {
        state.showModal = false
    },

    // PayType
    [types.REQUEST_GET_PAYTYPE_SUCCESS](state, payload) {
        if (payload && payload.payload && payload.payload.object) {
            state.payTypes = payload.payload.object.sort((a, b) =>
                a.id > b.id ? 1 : b.id > a.id ? -1 : 0
            );
        }
    },
    [types.REQUEST_SAVE_PAYTYPE_SUCCESS](state, payload) {
        state.showModal = false
    },
    // PayType End

    // Duration Type
    [types.REQUEST_SAVE_DURATION_TYPE_SUCCESS](state, payload) {
        state.showModal = false
    },
    [types.REQUEST_GET_DURATION_TYPE_SUCCESS](state, payload) {
        console.log(payload)
        state.durationTypes = payload.payload.object.object.sort((a, b) =>
            a.id > b.id ? 1 : b.id > a.id ? -1 : 0
        );
    },

    // Profession
    [types.REQUEST_SAVE_PROFESSION_SUCCESS](state, payload) {
        state.showModal = false;
    },
    [types.REQUEST_GET_PROFESSION_SUCCESS](state, payload) {
        state.profession = payload.payload.object.object.sort((a, b) =>
            a.id > b.id ? 1 : b.id > a.id ? -1 : 0
        );
    },
    //region
    [types.REQUEST_SAVE_REGION_SUCCESS](state, payload) {
        state.showModal = false
    },
    [types.REQUEST_SEARCH_REGION_SUCCESS](state, payload) {
        if (payload && payload.payload && payload.payload.object)
            state.searchItems = payload.payload.object;
    },

    // Region
    [types.REQUEST_SAVE_REGION_SUCCESS](state, payload) {
        state.showModal = false
    },
    [types.REQUEST_SEARCH_REGION_SUCCESS](state, payload) {
        if (payload && payload.payload && payload.payload.object)
            state.searchItems = payload.payload.object;
    },
    [types.REQUEST_GET_REGION_SUCCESS](state, payload) {
        if (payload && payload.payload && payload.payload.object) {
            state.regions = payload.payload.object.object.sort((a, b) =>
                a.id > b.id ? 1 : b.id > a.id ? -1 : 0
            );
            let ketmon = []
            for (let i = 0; i < state.regions.length; i++) {
                ketmon.push({value: state.regions[i].id, label: state.regions[i].name})
            }
            state.selectItems = ketmon
        }
    },

    // //teacher
    // [types.REQUEST_GET_TEACHER_SUCCESS](state, payload) {
    //     if (payload && payload.payload && payload.payload.object) {
    //         state.teachers = payload.payload.object.object.sort((a, b) =>
    //             a.id > b.id ? 1 : b.id > a.id ? -1 : 0
    //         );
    //         let ketmon = []
    //         for (let i = 0; i < state.teachers.length; i++) {
    //             ketmon.push({value: state.teachers[i].id, label: state.teachers[i].name})
    //         }
    //         state.selectItems = ketmon
    //     }
    // },
    // [types.REQUEST_SAVE_TEACHER_SUCCESS](state, payload) {
    //     state.showModal = false
    // },

    //specialized
    //reklama
    [types.REQUEST_SAVE_REKLAMA_SUCCESS](state, payload) {
        state.showModal = false
    },
    [types.REQUEST_GET_REKLAMA_SUCCESS](state, payload) {
        if (payload && payload.payload && payload.payload.object) {
            state.reklamas = payload.payload.object.object.sort((a, b) =>
                a.id > b.id ? 1 : b.id > a.id ? -1 : 0);
            let tesha = []
            for (let i = 0; i < state.reklamas.length; i++) {
                tesha.push({value: state.reklamas[i].id, label: state.reklamas[i].name})
            }
            state.selectItem = tesha
        }
    },
    //testCategory

    // Profession
    [types.REQUEST_SAVE_PROFESSION_SUCCESS](state, payload) {
        state.showModal = false;
    },
    [types.REQUEST_GET_PROFESSION_SUCCESS](state, payload) {
        state.profession = payload.payload.object.object.sort((a, b) =>
            a.id > b.id ? 1 : b.id > a.id ? -1 : 0
        );
    },

    // Test Cateogry

    [types.REQUEST_SAVE_TEST_CATEGORY_SUCCESS](state, payload) {
        state.showModal = false
    },
    [types.REQUEST_GET_TEST_CATEGORY_SUCCESS](state, payload) {
        state.testCategory = payload.payload.object.object.sort((a, b) =>
            a.id > b.id ? 1 : b.id > a.id ? -1 : 0
        );
    },

    // Course

    [types.REQUEST_SAVE_COURSE_SUCCESS](state, payload) {
        state.showModal = false;
    },
    [types.REQUEST_GET_COURSES_SUCCESS](state, payload) {
        if (payload && payload.payload && payload.payload.object) {
            state.getItems = payload.payload.object.sort((a, b) =>
                a.id > b.id ? 1 : b.id > a.id ? -1 : 0
            );
        }

    },
    [types.REQUEST_GET_COURSE_SUCCESS](state, payload) {
        if (payload && payload.payload && payload.payload.object) {
            state.currentItem = payload.payload.object
        }

    },

    // Course Cateogry
    [types.REQUEST_SAVE_COURSE_CATEGORY_SUCCESS](state, payload) {
        state.showModal = false
    },
    [types.REQUEST_GET_COURSE_CATEGORIES_SUCCESS](state, payload) {
        if (payload && payload.payload && payload.payload.object) {
            state.courseCategories = payload.payload.object.sort((a, b) =>
                a.id > b.id ? 1 : b.id > a.id ? -1 : 0
            );
        }
    },
    [types.REQUEST_GET_COURSE_CATEGORY_SUCCESS](state, payload) {
        if (payload && payload.payload && payload.payload.object) {
            state.currentItem = payload.payload.object
        }
    },


    // Trail Contact Type
    [types.REQUEST_SAVE_TRIAL_CONTACT_TYPE_SUCCESS](state, payload) {
        state.showModal = false
    },
    [types.REQUEST_GET_TRIAL_CONTACT_TYPE_SUCCESS](state, payload) {
        state.trialContactType = payload.payload.object.object.sort((a, b) =>
            a.id > b.id ? 1 : b.id > a.id ? -1 : 0
        );
    },

    //// Teacher

    [types.REQUEST_SAVE_TEACHER_SUCCESS](state, payload) {
        state.secondPage = false
    },
    [types.REQUEST_GET_TEACHER_SUCCESS](state, payload) {
        console.log(payload)
        state.teachers = payload.payload.object.object.sort((a, b) =>
            a.id > b.id ? 1 : b.id > a.id ? -1 : 0
        );
    },

    // Attachment
    [types.REQUEST_ATTACHMENT_SUCCESS](state, payload) {
        state.attachmentId = payload
    },
    updateState(state, {payload}) {
        return {
            ...state,
            ...payload,
        };
    },
};
export default createReducer(initState, reducers);
