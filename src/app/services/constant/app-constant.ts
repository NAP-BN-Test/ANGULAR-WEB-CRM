
export const GENDER_TYPE = {
    MALE: 0,
    FEMALE: 1
}

export const LOGIN_TYPE = {
    USERNAME_PASSWORD: 1,
    FACEBOOK: 2,
    GOOGLE: 3
}

export const JOB_STATE = {
    NORMAL: 0,
    REMIND: 1,
    WARNING: 2
}

export const JOB_STATUS = {
    CREATED: 0,
    DOING: 1,
    COMPLETE: 2
}

export const TODO_SORT = {
    FOR_ME: 1,
    FOR_DEP: 2,
    FOR_ALL: 3,
    PROFRESS: 4,
    FINISH: 5
}

export const NOTIFICATION_TYPE = {
    TODO: 1,
    ALERT: 2,
    WARNING: 3,
    REQUEST: 4,
}

export const TODO_OF_JOB_SORT = {
    INIT: 1,
    PROFRESS: 2,
    COMPLETE: 3,
}

export const MESSAGE = {
    ACCESS_FAIL: "Thao tác thất bại",
    LOGIN_FAIL: "Đăng nhập thất bại",
    NOT_FILL_DEBT: "Chưa chọn khoản vay",
    NO_USERNAME: "Tên đăng nhập không được bỏ trống",
    NO_PASSWORD: "Mật khẩu không được bỏ trống",
    LOG_OUT: "Bạn có chắc muốn đăng xuất?",
    DELETE: "Bạn có chắc muốn xoá mục này?",
    CONFIG: "Thiết lập server",
    FILL_IP: "Nhập địa chỉ IP"

}


export const STATUS = {
    FAIL: 0,
    SUCCESS: 1,
    OTHER_DEVICE: 2
}

export const LANGUAGE_TYPE = {
    VIETNAMESE: 1,
    ENGLISH: 2
}

export const DEVICE_CHECK_STATUS = {
    VARIABLE: 1,
    UPDATE: 2,
    UNVARIABLE: 3,
}

export const EVENT_NAME = {
    BACK_BUTTON: "back_button",
    SEARCH_CHANGE: "search_change",
    NOTIFI_REQUEST: "notifi-request",
    NOTIFI_TODO: "notifi-todo",
    LOAD_MAIN: "load-main",
    ADD_QUOTATION: "add-quotation",
}

export const DEBIT_CREDIT = {
    DEBIT: 0,
    CREDIT: 1
}

export const PICK_DATE = {
    DAILY: 1,
    WEEKLY: 2,
    MONTHLY: 3,
    ALL: 4,
}

export const ACTIVITY_TYPE = {
    ALL: 0,
    CALL: 1,
    EMAIL: 2,
    MEET: 3,
    NOTE: 4,
    TASK: 5,
}

export const COMPANY_ROLE = {
    PARENT: 1,
    CHILD: 2,
}

export const CONTACT_ROLE = {
    MANAGE: 1,
    STAFF: 2,
}

export const LIST_SELECT = {
    LIST_OUTCOME: [
        { id: 1, name: "No Answer" },
        { id: 2, name: "Busy" },
        { id: 3, name: "Wrong number" },
        { id: 4, name: "Left live message" },
        { id: 5, name: "Left voicemail" },
        { id: 6, name: "Connected" }
    ],
    LIST_DURATION: [
        { value: 900, name: "15 minutes" },
        { value: 1800, name: "30 minutes" },
        { value: 3600, name: "1 hour" },
        { value: 7200, name: "2 hours" },
        { value: 10800, name: "3 hours" }
    ],
    LIST_ACTIVITY: [
        { id: 1, name: "Call" },
        { id: 2, name: "Email" },
        { id: 3, name: "Meet" },
    ],
    LIST_GENDER: [
        { id: 1, name: "Nam" },
        { id: 2, name: "Nữ" }
    ],
    LIST_JOB_TILE: [
        { id: 1, name: "Quản lý" },
        { id: 2, name: "Nhân viên" }
    ],
    LIST_CONTACT_OWNER: [
        { id: 1, name: "Owner 1" },
        { id: 2, name: "Owner 2" }
    ]
}


