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
        { id: 1, name: "Công ty cha" },
        { id: 2, name: "Công ty con" }
    ],
    LIST_TIME: [
        { name: "05:00 AM", value: "05:00" },
        { name: "05:15 AM", value: "05:15" },
        { name: "05:30 AM", value: "05:30" },
        { name: "05:45 AM", value: "05:45" },
        { name: "06:00 AM", value: "06:00" },
        { name: "06:15 AM", value: "06:15" },
        { name: "06:30 AM", value: "06:30" },
        { name: "06:45 AM", value: "06:45" },
        { name: "07:00 AM", value: "07:00" },
        { name: "07:15 AM", value: "07:15" },
        { name: "07:30 AM", value: "07:30" },
        { name: "07:45 AM", value: "07:45" },
        { name: "08:00 AM", value: "08:00" },
        { name: "08:15 AM", value: "08:15" },
        { name: "08:30 AM", value: "08:30" },
        { name: "08:45 AM", value: "08:45" },
        { name: "09:00 AM", value: "09:00" },
        { name: "09:15 AM", value: "09:15" },
        { name: "09:30 AM", value: "09:30" },
        { name: "09:45 AM", value: "09:45" },
        { name: "10:00 AM", value: "10:00" },
        { name: "10:15 AM", value: "10:15" },
        { name: "10:30 AM", value: "10:30" },
        { name: "10:45 AM", value: "10:45" },
        { name: "11:00 AM", value: "11:00" },
        { name: "11:15 AM", value: "11:15" },
        { name: "11:30 AM", value: "11:30" },
        { name: "11:45 AM", value: "11:45" },
        { name: "12:00 AM", value: "12:00" },
        { name: "12:15 AM", value: "12:15" },
        { name: "12:30 AM", value: "12:30" },
        { name: "12:45 AM", value: "12:45" },
        { name: "01:00 PM", value: "13:00" },
        { name: "01:15 PM", value: "13:15" },
        { name: "01:30 PM", value: "13:30" },
        { name: "01:45 PM", value: "13:45" },
        { name: "02:00 PM", value: "14:00" },
        { name: "02:15 PM", value: "14:15" },
        { name: "02:30 PM", value: "14:30" },
        { name: "02:45 PM", value: "14:45" },
        { name: "03:00 PM", value: "15:00" },
        { name: "03:15 PM", value: "15:15" },
        { name: "03:30 PM", value: "15:30" },
        { name: "03:45 PM", value: "15:45" },
        { name: "04:00 PM", value: "16:00" },
        { name: "04:15 PM", value: "16:15" },
        { name: "04:30 PM", value: "16:30" },
        { name: "04:45 PM", value: "16:45" },
        { name: "05:00 PM", value: "17:00" },
        { name: "05:15 PM", value: "17:15" },
        { name: "05:30 PM", value: "17:30" },
        { name: "05:45 PM", value: "17:45" },
        { name: "06:00 PM", value: "18:00" },
        { name: "06:15 PM", value: "18:15" },
        { name: "06:30 PM", value: "18:30" },
        { name: "06:45 PM", value: "18:45" },
        { name: "07:00 PM", value: "19:00" },
        { name: "07:15 PM", value: "19:15" },
        { name: "07:30 PM", value: "19:30" },
        { name: "07:45 PM", value: "19:45" },
        { name: "08:00 PM", value: "20:00" },
        { name: "08:15 PM", value: "20:15" },
        { name: "08:30 PM", value: "20:30" },
        { name: "08:45 PM", value: "20:45" },
        { name: "09:00 PM", value: "21:00" },
        { name: "09:15 PM", value: "21:15" },
        { name: "09:30 PM", value: "21:30" },
        { name: "09:45 PM", value: "21:45" },
        { name: "10:00 PM", value: "22:00" },
        { name: "10:15 PM", value: "22:15" },
        { name: "10:30 PM", value: "22:30" },
        { name: "10:45 PM", value: "22:45" },
        { name: "11:00 PM", value: "23:00" },
        { name: "11:15 PM", value: "23:15" },
        { name: "11:30 PM", value: "23:30" },
        { name: "11:45 PM", value: "23:45" },
        { name: "00:00 AM", value: "00:00" },
    ]
}

export const BUTTON_TYPE = {
    DELETE: 9,
    ASSIGN: 1,
    ADD_LIST_MAIL: 2,
    COMPLETE: 3,
    PRINT: 4
}

export const REPORT_TYPE = {
    MAIL_OPEN: 1,
    MAIL_INVALID: 3,
    MAIL_UNSUBSCRIBE: 4,
}

export const EVENT_PUSH = {
    TABLE: 'table-event',
    SELECTION: 'table-selection',
    ACTIVITY: 'activity'
}

export const CLICK_DETAIL = {
    COMPANY: 1,
    CONTACT: 2,
    ACTIVITY: 3,
    MAIL_LIST: 4,
    MAIL_REPORT: 5
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

export const MAIL_RESPONSE_TYPE = {
    SEND: 1,
    OPEN: 2,
    CLICK_LINK: 3,
    INVALID: 4,
    UNSUBSCRIBE: 5
}

export const LOCAL_STORAGE_KEY = {
    SERVER_INFO: "server-info",
    USER_LOGIN: "user-login",
    USER_INFO: "user-info",
    SEND_EMAIL: "send_email",
    LANGUAGE_KEY: "language_key",
    LANGUAGE_DATA: "language-data",
    REPORT_TIME_SELECT: 'report_time_select',
    REPORT_TIME_SELECT_TIME_PICKER: 'report_time_select_time_picker',
}

export const TIME_SELECT = {
    TODAY: 1,
    YESTERDAY: 2,
    LAST_24H: 3,
    LAST_7DAY: 4,
    LAST_30DAY: 5,
    THIS_MONTH: 6,
    LAST_MONTH: 7,
    ALL_TIME: 8,
    SELECT: 9,
}

export const TIME_TYPE = {
    HOUR: 1,  //Giờ
    DAY: 2,   //Thứ trong tuần
    DATE: 3,   //Ngày trong tháng
    MONTH: 4   //Tháng trong năm
}

export const MENU_INDEX = {
    CONTACT: 1,
    ACTIVITY: 2,
    EMAILING_LIST: 3,
    REPORT: 4,
    CATEGORY: 5
}


