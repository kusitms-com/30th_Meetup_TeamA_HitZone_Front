import React from "react";

import UserMessageWithTail from "./message/UserMessageWithTail";

interface Props {
    messageList: string[];
}

// 사용자 채팅 한 세트를 그룹화한 컴포넌트
const RookieChat = ({messageList}: Props) => {

    return (
        <div className="flex justify-end mb-4">
            <UserMessageWithTail messageList={messageList} />
        </div>
    );
};

export default RookieChat;
