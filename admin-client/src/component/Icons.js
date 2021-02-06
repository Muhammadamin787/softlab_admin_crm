import React from 'react';

function WarehouseIcon() {
    return (
        <svg width="24" height="20" viewBox="0 0 24 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M12 0L0.576923 4.66824L0 4.9217V20H24V4.9226L23.4231 4.66824L12 0ZM12 1.98063L22.1538 6.13832V18.1896H20.3077V8.2321H3.69231V18.1896H1.84615V6.13832L12 1.98063ZM5.53846 10.0425H18.4615V18.1896H5.53846V10.0425Z"
                fill="#808080" fill-opacity="1"/>
        </svg>
    );
}

function DashboardIcon(props) {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M10 3H14V21H10V3Z"
                  stroke={props.color}
                  stroke-width="2"
                  stroke-linecap="round" stroke-linejoin="round"/>
            <path fillRule="evienodd" clipRule="evenodd" d="M18 8H22V21H18V8Z"
                  stroke={props.color} stroke-width="2"
                  stroke-linecap="round" stroke-linejoin="round"/>
            <path fillRule="evenodd" clipRule="evenodd" d="M2 13H6V21H2V13Z"
                  stroke={props.color} stroke-width="2"
                  stroke-linecap="round" stroke-linejoin="round"/>
        </svg>

    );
}

function EditIcon(props) {
    return (
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M12.728 6.68601L11.314 5.27201L2 14.586V16H3.414L12.728 6.68601ZM14.142 5.27201L15.556 3.85801L14.142 2.44401L12.728 3.85801L14.142 5.27201ZM4.242 18H0V13.757L13.435 0.322007C13.6225 0.134536 13.8768 0.0292206 14.142 0.0292206C14.4072 0.0292206 14.6615 0.134536 14.849 0.322007L17.678 3.15101C17.8655 3.33853 17.9708 3.59284 17.9708 3.85801C17.9708 4.12317 17.8655 4.37748 17.678 4.56501L4.243 18H4.242Z"
                fill="#313E47"/>
        </svg>
    );
}

function DeleteIcon(props) {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M10 11V17M14 11V17M4 7H20M19 7L18.133 19.142C18.0971 19.6466 17.8713 20.1188 17.5011 20.4636C17.1309 20.8083 16.6439 21 16.138 21H7.862C7.35614 21 6.86907 20.8083 6.49889 20.4636C6.1287 20.1188 5.90292 19.6466 5.867 19.142L5 7H19ZM15 7V4C15 3.73478 14.8946 3.48043 14.7071 3.29289C14.5196 3.10536 14.2652 3 14 3H10C9.73478 3 9.48043 3.10536 9.29289 3.29289C9.10536 3.48043 9 3.73478 9 4V7H15Z"
                stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>

    );
}

function UserIcon(props) {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd"
                  d="M12 23C5.92487 23 1 18.0751 1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23ZM19.3995 17.1246C20.4086 15.6703 21 13.9042 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 13.9042 3.59138 15.6703 4.6005 17.1246C5.72595 15.6381 8.3706 15 12 15C15.6294 15 18.274 15.6381 19.3995 17.1246ZM17.9647 18.7398C17.672 17.6874 15.5694 17 12 17C8.43062 17 6.328 17.6874 6.03532 18.7398C7.6233 20.1462 9.71194 21 12 21C14.2881 21 16.3767 20.1462 17.9647 18.7398ZM12 15C9.76086 15 8 13.4274 8 10C8 7.75576 9.5791 6 12 6C14.4142 6 16 7.92158 16 10.2C16 13.4796 14.2181 15 12 15ZM10 10C10 12.2693 10.8182 13 12 13C13.1777 13 14 12.2984 14 10.2C14 8.95042 13.2157 8 12 8C10.7337 8 10 8.81582 10 10Z"
                  stroke={props.color}
                  fill={props.color}
            />
        </svg>


    );
}

function HisobotIcon(props) {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd"
                  d="M5 1H15.4142L21 6.58579V21C21 22.1046 20.1046 23 19 23H5C3.89543 23 3 22.1046 3 21V3C3 1.89543 3.89543 1 5 1ZM13 3H5V21H19V9H15C13.8954 9 13 8.10457 13 7V3ZM15 3.41421V7H18.5858L15 3.41421Z"
                  stroke={props.color}
                  fill={props.color}
            />
        </svg>
    );
}

function RegionIcon(props) {
    return (
        <svg width="18" height="22" viewBox="0 0 18 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M9 21.7282L2.636 15.3642C1.37734 14.1055 0.520186 12.5018 0.172928 10.756C-0.17433 9.01019 0.00390685 7.2006 0.685099 5.55607C1.36629 3.91154 2.51984 2.50594 3.99988 1.51701C5.47992 0.528082 7.21997 0.000244141 9 0.000244141C10.78 0.000244141 12.5201 0.528082 14.0001 1.51701C15.4802 2.50594 16.6337 3.91154 17.3149 5.55607C17.9961 7.2006 18.1743 9.01019 17.8271 10.756C17.4798 12.5018 16.6227 14.1055 15.364 15.3642L9 21.7282ZM13.95 13.9502C14.9289 12.9712 15.5955 11.7239 15.8655 10.366C16.1356 9.00819 15.9969 7.60076 15.4671 6.32172C14.9373 5.04268 14.04 3.94947 12.8889 3.18033C11.7378 2.4112 10.3844 2.00067 9 2.00067C7.61556 2.00067 6.26221 2.4112 5.11109 3.18033C3.95996 3.94947 3.06275 5.04268 2.53292 6.32172C2.00308 7.60076 1.86442 9.00819 2.13445 10.366C2.40449 11.7239 3.07111 12.9712 4.05 13.9502L9 18.9002L13.95 13.9502V13.9502ZM9 11.0002C8.46957 11.0002 7.96086 10.7895 7.58579 10.4144C7.21072 10.0393 7 9.5306 7 9.00017C7 8.46973 7.21072 7.96103 7.58579 7.58595C7.96086 7.21088 8.46957 7.00017 9 7.00017C9.53043 7.00017 10.0391 7.21088 10.4142 7.58595C10.7893 7.96103 11 8.46973 11 9.00017C11 9.5306 10.7893 10.0393 10.4142 10.4144C10.0391 10.7895 9.53043 11.0002 9 11.0002Z"
                fill={props.color}
            />
        </svg>


    );
}

function MessageIcon(props) {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd"
                  d="M21 15C21 16.1046 20.1046 17 19 17H7L3 21V5C3 3.89543 3.89543 3 5 3H19C20.1046 3 21 3.89543 21 5V15Z"
                  stroke={props.color}
                  stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>


    );
}

function CloseIcon(props) {
    return (
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M7.00072 5.58574L11.9507 0.635742L13.3647 2.04974L8.41472 6.99974L13.3647 11.9497L11.9507 13.3637L7.00072 8.41374L2.05072 13.3637L0.636719 11.9497L5.58672 6.99974L0.636719 2.04974L2.05072 0.635742L7.00072 5.58574Z"
                fill="#313E47"/>
        </svg>
    );
}

function HourIcon(props) {
    return (
        <svg width="24" height="24" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd"
                  d="M6.99984 12.8333C10.2215 12.8333 12.8332 10.2216 12.8332 6.99996C12.8332 3.7783 10.2215 1.16663 6.99984 1.16663C3.77818 1.16663 1.1665 3.7783 1.1665 6.99996C1.1665 10.2216 3.77818 12.8333 6.99984 12.8333Z"
                  stroke={props.color}
                // stroke="#D0D1D2"
                  stroke-width="1.16667" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M7 3.5V7L8.75 8.75"
                  stroke={props.color}
                // stroke="#D0D1D2"
                  stroke-width="1.16667" stroke-linecap="round"
                  stroke-linejoin="round"/>
        </svg>


    )
        ;
}

function AddSectionIcon() {
    return (
        <svg width="53" height="53" viewBox="0 0 53 53" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g filter="url(#filter0_d)">
                <rect x="4" width="45" height="45" rx="22.5" fill="#04A6FB"/>
            </g>
            <path d="M26 22V16H28V22H34V24H28V30H26V24H20V22H26Z" fill="white"/>
            <defs>
                <filter id="filter0_d" x="0" y="0" width="53" height="53" filterUnits="userSpaceOnUse"
                        color-interpolation-filters="sRGB">
                    <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/>
                    <feOffset dy="4"/>
                    <feGaussianBlur stdDeviation="2"/>
                    <feColorMatrix type="matrix"
                                   values="0 0 0 0 0.120833 0 0 0 0 0.12033 0 0 0 0 0.12033 0 0 0 0.25 0"/>
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/>
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"/>
                </filter>
            </defs>
        </svg>


    )

}

function BrandIcon() {
    return (
        <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M13 10.3333C10.1343 10.3333 8.70149 11.6667 8.70149 14.3333C8.70149 16.3333 10.8421 19.0467 13 21.6667C14.4328 23 15.1493 23.6667 16.5821 24.3333C18.0149 25 20.1642 25.6667 23.0299 23.6667C25.8955 21.6667 25.1791 19 23.7463 15.6667C22.3134 12.3333 20.4035 8.33333 16.5821 3C15.3871 1.66667 14.4328 1 12.9957 1C11.5629 1 10.6702 1.6 9.41791 3C5.59654 8.33333 3.68657 12.3333 2.25373 15.6667C0.820896 19 0.104478 21.6667 2.97015 23.6667C5.83582 25.6667 7.98507 25 9.41791 24.3333C10.8507 23.6667 11.5672 23 13 21.6667C15.1579 19.0467 17.2985 16.3333 17.2985 14.3333C17.2985 11.6667 15.8657 10.3333 13 10.3333Z"
                stroke="black" stroke-opacity="0.5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
    );
}

function ShowIcon() {
    return (
        <svg width="22" height="15" viewBox="0 0 22 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M20.8701 7.50012C20.2301 6.39012 16.7101 0.820116 10.7301 1.00012C5.20007 1.14012 2.00007 6.00012 1.13007 7.50012C1.0423 7.65213 0.996094 7.82458 0.996094 8.00012C0.996094 8.17565 1.0423 8.3481 1.13007 8.50012C1.76007 9.59012 5.13007 15.0001 11.0201 15.0001H11.2701C16.8001 14.8601 20.0101 10.0001 20.8701 8.50012C20.9578 8.3481 21.004 8.17565 21.004 8.00012C21.004 7.82458 20.9578 7.65213 20.8701 7.50012ZM11.2201 13.0001C6.91007 13.1001 4.10007 9.41012 3.22007 8.00012C4.22007 6.39012 6.83007 3.10012 10.8301 3.00012C15.1201 2.89012 17.9401 6.59012 18.8301 8.00012C17.8001 9.61012 15.2201 12.9001 11.2201 13.0001Z"
                fill="black"/>
            <path
                d="M11 4.5C10.3078 4.5 9.63108 4.70527 9.05551 5.08986C8.47993 5.47444 8.03133 6.02107 7.76642 6.66061C7.50152 7.30015 7.4322 8.00388 7.56725 8.68282C7.7023 9.36175 8.03564 9.98539 8.52513 10.4749C9.01461 10.9644 9.63825 11.2977 10.3172 11.4327C10.9961 11.5678 11.6999 11.4985 12.3394 11.2336C12.9789 10.9687 13.5256 10.5201 13.9101 9.9445C14.2947 9.36892 14.5 8.69223 14.5 8C14.5 7.07174 14.1313 6.1815 13.4749 5.52513C12.8185 4.86875 11.9283 4.5 11 4.5ZM11 9.5C10.7033 9.5 10.4133 9.41203 10.1666 9.2472C9.91997 9.08238 9.72771 8.84811 9.61418 8.57403C9.50065 8.29994 9.47095 7.99834 9.52882 7.70736C9.5867 7.41639 9.72956 7.14912 9.93934 6.93934C10.1491 6.72956 10.4164 6.5867 10.7074 6.52882C10.9983 6.47094 11.2999 6.50065 11.574 6.61418C11.8481 6.72771 12.0824 6.91997 12.2472 7.16665C12.412 7.41332 12.5 7.70333 12.5 8C12.5 8.39782 12.342 8.77936 12.0607 9.06066C11.7794 9.34196 11.3978 9.5 11 9.5Z"
                fill="black"/>
        </svg>

    );
}

function BgIcon() {
    return (
        <svg width="394" height="154" viewBox="0 0 394 154" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd"
                  d="M-75 144.694L36.5146 68.2889L174.471 103.696L266.442 29.1544L382.555 86.9243L555 -40.7285V199.669H-75V144.694Z"
                  fill="url(#paint0_radial)"/>
            <defs>
                <radialGradient id="paint0_radial" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse"
                                gradientTransform="translate(240 30.1856) rotate(90) scale(158.042 414.176)">
                    <stop stop-color="white" stop-opacity="0.401825"/>
                    <stop offset="1" stop-color="#3EC566" stop-opacity="0.0356753"/>
                </radialGradient>
            </defs>
        </svg>
    );
}


export {
    RegionIcon,
    BgIcon,
    ShowIcon,
    DeleteIcon,
    HisobotIcon,
    WarehouseIcon,
    DashboardIcon,
    MessageIcon,
    HourIcon,
    EditIcon,
    UserIcon,
    AddSectionIcon,
    BrandIcon,
    CloseIcon
};
