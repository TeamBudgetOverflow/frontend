export const setProgressState = (attainment: number): string => {
  if (attainment < 10) return '💝 목표를 이루기 위해 다짐한 멋진 마음! 응원할게요';
  if (attainment < 20) return '⛰ 차근차근 모은 티끌이 조만간 태산이 될거에요';
  if (attainment < 30) return '😎 시작했을 때의 다짐을 떠올려 봐요';
  if (attainment < 40) return '🥳 어느새 3분의 1 넘게 모으고 있어요! 금새 절반에 다다를 거에요';
  if (attainment < 50) return '👍 절반에 가까워지고 있어요! 최고에요';
  if (attainment < 60) return '🤩 벌써 절반을 넘었어요! 잘하고 있어요!';
  if (attainment < 70) return '🤸 목표 달성 했을 때의 즐거움을 떠올려봐요';
  if (attainment < 80) return '🏃 목표 달성까지 얼마 남지 않았어요! 조금만 더 힘내봐요';
  if (attainment < 90) return '🤟 목표 달성이 코앞이에요!';
  if (attainment < 100) return '🌄 정상에 오르기 일보 직전!';
  if (attainment === 100) return '🎉 목표를 달성했어요! 정말 멋져요';

  return 'undefined goal attainment value';
};
