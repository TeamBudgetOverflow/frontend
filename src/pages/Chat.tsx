import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { io, Socket } from 'socket.io-client';
import styled from 'styled-components';
import TextareaAutosize from 'react-textarea-autosize';

type Msg = {
  msgId: number;
  userId: number;
  content: string;
  // likes or reaction?
  reaction: string;
};

type UserProfile = {
  userId: number;
  nickname: string;
  img: string;
};

const Chat = () => {
  const { id } = useParams();
  const [socket, setSocket] = useState<Socket>();
  const [chatName, setChatName] = useState<string>('');
  const [members, setMembers] = useState<Array<UserProfile>>([]);
  useEffect(() => {
    const socket = io();
    setSocket(socket);
    socket.emit(
      'enterChat',
      id,
      (name: string, members: Array<UserProfile>) => {
        setChatName(name);
        setMembers(members);
      }
    );
  }, []);

  const [msg, setMsg] = useState<string>('');
  const handleMsgChange = (e: React.FormEvent<HTMLTextAreaElement>) => {
    setMsg(e.currentTarget.value);
  };

  const [rows, setRows] = useState<number>(1);
  const handleMsgEnter = (e: React.KeyboardEvent) => {
    if (e.code === 'Enter') {
      if (!e.shiftKey) {
        return handleMsgSubmit();
      }

      setRows((prev) => prev + 1);
    }
  };

  // TODO: use userId, nickname from store
  const [userId] = useState<number>(1);
  const [nickname] = useState<string>('사용자');
  const [msgList, setMsgList] = useState<Array<Msg>>([]);
  const handleMsgSubmit = () => {
    if (msg.length === 0) return;
    const msgObj = { msgId: 1, userId: userId, content: msg, reaction: '' };
    socket?.emit('msg', { payload: msgObj }, () => {
      setMsgList([...msgList, msgObj]);
      setMsg('');
    });
  };

  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    ref.current?.scrollIntoView();
  }, [msgList]);
  return (
    <Wrapper>
      <ChatInfo>
        <ChatTitle>{chatName}</ChatTitle>
        <MembersBox>
          {members.length !== 0 ? (
            members
              .slice(0, 2)
              .map((v) => <span key={v.userId}>{v.nickname},</span>)
          ) : (
            <></>
          )}
          외 {members.length !== 0 ? members.length - 2 : <></>} 명{' '}
          <span></span>
        </MembersBox>
      </ChatInfo>
      <Contents>
        {msgList.map((msg, idx) => {
          if (idx === msgList.length - 1) {
            return (
              <MsgRow ref={ref} key={msg.msgId}>
                <UserInfo>
                  <UserImg />
                </UserInfo>
                <MsgBox>
                  <Nickname>{nickname}</Nickname>
                  <MsgContent>{msg.content}</MsgContent>
                </MsgBox>
              </MsgRow>
            );
          }
          return (
            <MsgRow key={msg.msgId}>
              <UserInfo>
                <UserImg />
              </UserInfo>
              <MsgBox>
                <Nickname>{nickname}</Nickname>
                <MsgContent>{msg.content}</MsgContent>
              </MsgBox>
            </MsgRow>
          );
        })}
      </Contents>
      <InputWrapper>
        <TextareaAutosize
          value={msg}
          onChange={handleMsgChange}
          onKeyUp={handleMsgEnter}
          placeholder='메세지를 입력해주세요'
          rows={rows}
          style={{
            padding: 0,
            width: '95%',
            height: 50,
            lineHeight: '50px',
            textIndent: '10px',
            resize: 'none',
          }}
        />
        <Btn onClick={handleMsgSubmit}>전송</Btn>
      </InputWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
`;

const ChatInfo = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: #2bc470;
  font-size: 20px;
  font-weight: 800;
  color: #e4f7ea;
`;

const ChatTitle = styled.h1``;

const MembersBox = styled.div`
  padding: 10px;
  border-radius: 15px;
  :hover {
    cursor: pointer;
    background-color: rgba(255, 255, 255, 0.5);
  }
`;

const Contents = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  background-color: #e4f7ea;
  overflow-y: auto;
`;

const MsgRow = styled.div`
  padding: 20px;
  display: flex;
  justify-content: row;
  gap: 10px;
`;

const UserInfo = styled.div``;

const UserImg = styled.img`
  width: 52px;
  height: 52px;
  border-radius: 50%;
  border: 1px solid black;
`;

const MsgBox = styled.div`
  float: left;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Nickname = styled.div`
  font-size: 12px;
`;

const MsgContent = styled.div`
  padding: 20px;
  width: auto;
  background-color: #2bc470;
  border-radius: 25px 25px 25px 0;
  font-size: 16px;
  word-break: break-all;
  white-space: pre-wrap;
`;

const InputWrapper = styled.div`
  padding: 20px 0;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
`;

const Btn = styled.button`
  height: 50px;
  padding: 5px 20px;
  background-color: #2bc470;
  border: none;
  :hover {
    cursor: pointer;
    background-color: #e4f7ea;
    border: 2px solid #2bc470;
  }
`;

export default Chat;
