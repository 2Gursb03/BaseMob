import React from 'react';
import LGLogo from '@/assets/images/lg.svg';
import SSGLogo from '@/assets/images/ssg.svg';
import DoosanLogo from '@/assets/images/doosan.svg';
import KiaLogo from '@/assets/images/kia.svg';
import LotteLogo from '@/assets/images/lotte.svg';
import SamsungLogo from '@/assets/images/samsung.svg';
import NCLogo from '@/assets/images/nc.svg';
import HanwhaLogo from '@/assets/images/hanwha.svg';
import KTLogo from '@/assets/images/kt.svg';
import KiwoomLogo from '@/assets/images/kiwoom.svg';

// 반드시 export const로 내보내야 함
export const TeamLogos: { [key: string]: React.FC<any> } = {
  'LG': LGLogo, 'SSG': SSGLogo, '두산': DoosanLogo, '기아': KiaLogo, '롯데': LotteLogo,
  '삼성': SamsungLogo, 'NC': NCLogo, '한화': HanwhaLogo, 'KT': KTLogo, '키움': KiwoomLogo,
};

export interface TeamStanding {
  rank: number; name: string; pct: string; gb: string; win: number;
  draw: number; loss: number; played: number; streak: string;
  avg: string; era: string; recent: string;
}