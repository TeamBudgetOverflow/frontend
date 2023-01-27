interface privateInfoFormatterParams {
  data: string | number;
  showLen: number;
  showDir: 'head' | 'tail';
}

export const privateInfoFormatter = ({ data, showLen, showDir }: privateInfoFormatterParams): string => {
  const strData = String(data);

  if (showDir === 'head') {
    return strData.slice(0, showLen) + '*'.repeat(strData.length - showLen);
  }

  return '*'.repeat(strData.length - showLen) + strData.slice(-showLen);
};
