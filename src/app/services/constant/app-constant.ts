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
    VIETNAMESE: "VI",
    ENGLISH: "EN"
}

export const ACTIVITY_TYPE = {
    ALL: 0,
    CALL: 1,
    EMAIL: 2,
    MEET: 3,
    NOTE: 4,
    TASK: 5,
}

export const TASK_TYPE = {
    CALL: 1,
    EMAIL: 2,
    MEET: 3
}

export const CALL_STATUS = {
    NO_ANSWER: 1,
    BUSY: 2,
    WRONG_NUMBER: 3,
    LEFT_MESSAGE: 4,
    LEFT_VOID: 5,
    CONNECTED: 6,
}

export const MAIL_STATUS = {
    SENT: 1,
    RECEIVED: 2,
    ANSWERED: 3,
    WRONG_EMAIL: 4
}

export const COMPANY_ROLE = {
    PARENT: 1,
    CHILD: 2,
}

export const COMPANY_TYPE = {
    TRIAL: 0,
    LICENCE: 1,
}

export const CONTACT_ROLE = {
    UNDIFINE: 0,
    CEO: 1,
    MANAGE: 2,
    STAFF: 3,
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
    LIST_MAIL_STATUS: [
        { id: 1, name: "Đã gửi" },
        { id: 2, name: "Đã nhận" },
        { id: 3, name: "Đã trả lời" },
        { id: 4, name: "Sai địa chỉ email" }
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
        { id: 0, name: "Chưa xác định" },
        { id: 1, name: "Lãnh đạo" },
        { id: 2, name: "Quản lý" },
        { id: 3, name: "Nhân viên" }
    ],
    LIST_COMPANY_ROLE: [
        { id: 1, name: "Parent" },
        { id: 2, name: "Child" }
    ]
}

export const BUTTON_TYPE = {
    DELETE: 9,
    ASSIGN: 1,
    ADD_LIST_MAIL: 2,
    COMPLETE: 3,
    PRINT: 4
}

export const EVENT_PUSH = {
    TABLE: 'table-event',
    SELECTION: 'table-selection',
}

export const CLICK_DETAIL = {
    COMPANY: 1,
    CONTACT: 2,
    ACTIVITY: 3,
    MAIL_LIST: 4
}

export const SORT_TYPE = {
    USER: 1,
    TIME_START: 2,
    TIME_END: 3,
    SEARCH: 4,
    STEP: 5,
    CITY: 6,
    TIME_TYPE: 7,

}


