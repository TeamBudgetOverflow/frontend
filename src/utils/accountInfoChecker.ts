import { IAccount, IMemeberInfo } from '../interfaces/interfaces';

export const accountIdFinder = (members: Array<IMemeberInfo>, userId: number) => {
  const found = members.find((member) => member.userId === userId);
  const accountId = !found ? 0 : found.accountId;

  return accountId;
};

export const balanceIdFinder = (members: Array<IMemeberInfo>, userId: number) => {
  const found = members.find((member) => member.userId === userId);
  const balanceId = !found ? 0 : found.balanceId;

  return balanceId;
};

export const accountInfoFinder = (accounts: Array<IAccount>, accountId: number): IAccount => {
  const found = accounts.find((accnt) => accnt.accountId === accountId);
  const account: IAccount = !found ? { accountId: 0, bankId: 0, acctNo: '', connected: false } : found;

  return account;
};

export const availAutoAccountFinder = (accounts: Array<IAccount>): Array<IAccount> => {
  return accounts.filter((accnt) => accnt.bankId !== 2 && !accnt.connected);
};

export const isAutoAccountAddable = (accounts: Array<IAccount>): boolean => {
  return accounts.filter((accnt) => accnt.bankId !== 2).length < 1;
};

export const availManualAccountFinder = (accounts: Array<IAccount>): Array<IAccount> => {
  return accounts.filter((accnt) => accnt.bankId === 2 && !accnt.connected);
};

export const isManualAccntAddable = (accounts: Array<IAccount>): boolean => {
  return accounts.filter((accnt) => accnt.bankId === 2).length < 10;
};
