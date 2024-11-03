import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Image from 'next/image';

const Page = () => {
    // 닉네임 상태 관리
    const [nickname, setNickname] = useState('');

    const handleNickNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.target.value;
        
        // 최대 20글자
        if (input.length <= 20) {
            setNickname(input);
        }
    };

    return (
        <>
        </>
    )
}


export default Page