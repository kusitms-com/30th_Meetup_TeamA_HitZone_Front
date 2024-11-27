import React, { useState, useEffect } from "react";

import RookieProfile from "./rookie/RookieProfile";
import RookieMessageWithTail from "./message/RookieMessageWithTail";
import RookieMessage from "./message/RookieMessage";
import RookiePreformattedMessageWithTail from "@/src/pages/Chatbot/components/message/custom/RookiePreformattedMessageWithTail";
import RookiePreformattedMessage from "@/src/pages/Chatbot/components/message/custom/RookiePreformattedMessage";
import RookieImageMessage from "@/src/pages/Chatbot/components/message/custom/RookieImageMessage";

import { questionCategories } from "@/src/constants/ChatbotData";

// 루키 채팅 구조
// 1. 첫 번째 텍스트 리스트 (선택)
// - 배열로 받으면 꼬랑지 말풍선
// - 문자열로 받으면 \n 을 줄바꿈으로 인식하는 꼬랑지 말풍선
//
// 2. 이미지 리스트 (선택)
// 3. 컴포넌트 (선택)
// 4. 첫 번째 텍스트 또는 이미지 또는 컴포넌트가 나온 이후에 등장하는 텍스트 리스트 (선택):  일반 말풍선
// - 배열로 받으면 일반 말풍선  (ex) ["안녕하세요", "나는 박인애입니다."]
// - 문자열로 받으면 \n 을 줄바꿈으로 인식하는 일반 말풍선  (ex) "안녕하세요\n나는 박인애입니다."
//
// 2~4는 반복적으로 출력 가능
// 하나의 텍스트 리스트는 줄바꿈으로 원소를 구분해서 하나의 말풍선 안에 출력
interface RookieChatProps {
    initialMessage?: string[];
    initialPreformattedMessage?: string;
    contentList?: Array<{ type: "image"; content: string } | { type: "component"; content: React.ReactNode} | { type: "textList"; content: string[] } | { type: "preformattedText"; content: string }>;
}

// 루키 채팅 한 세트를 그룹화한 컴포넌트
const RookieChat = ({initialMessage, initialPreformattedMessage, contentList}: RookieChatProps) => {

    return (
        <div className="flex items-start mb-2 ">
            {/* 챗봇 프로필 사진 */}
            <RookieProfile/>
            <div className="flex-col px-4 space-y-2">
                {/* 챗봇 이름 */}
                <p className="text-[14px] font-medium text-black">챗봇 {questionCategories.chatbotName}</p>

                {/* 첫 번째 말풍선 */}
                {initialMessage && (
                    <RookieMessageWithTail messageList={initialMessage}/>
                )}
                {initialPreformattedMessage && (
                    <RookiePreformattedMessageWithTail message={initialPreformattedMessage} />
                )}
                
                {/* 이미지와 텍스트 리스트 */}
                {contentList &&
                    // 이미지인 경우: 이미지 CSS 조정해서 반환
                    contentList.map((item, index) => {
                    if (item.type === "image") {
                        return (
                            <div key={index}>
                                <RookieImageMessage imgUrl={item.content} />
                            </div>
                        );
                    
                    // 컴포넌트인 경우: 컴포넌트(item) 그대로 반환
                    } else if (item.type == "component") {
                        return (
                            <div key={index}>
                                {item.content}
                            </div>
                        );

                    // string[]인 경우: 각 배열 원소를 줄바꿈으로 인식하는 루키 말풍선 컴포에 담아서 반환
                    } else if (item.type === "textList") {
                        return (
                            <div key={index}>
                                <RookieMessage messageList={item.content} />
                            </div>
                        );

                    // string인 경우: \n을 줄바꿈으로 인식하는 루키 말풍선 컴포에 담아서 반환
                    } else if (item.type === "textList") {
                        return (
                            <div key={index}>
                                <RookiePreformattedMessage messageList={item.content} />
                            </div>
                        );
                    }
                    return null;
                    })}
            </div>
        </div>
    );
};

export default RookieChat;
