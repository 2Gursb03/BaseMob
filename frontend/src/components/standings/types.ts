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

export const TeamLogos: { [key: string]: React.FC<any> } = {
  'LG': LGLogo, 'SSG': SSGLogo, '두산': DoosanLogo, '기아': KiaLogo, '롯데': LotteLogo,
  '삼성': SamsungLogo, 'NC': NCLogo, '한화': HanwhaLogo, 'KT': KTLogo, '키움': KiwoomLogo,
};

// 1. 팀 순위 타입
export interface TeamStanding {
  rank: number; name: string; pct: string; gb: string; win: number;
  draw: number; loss: number; played: number; streak: string; era: string; avg: string; recent: string;
}

export interface IndividualBatter {
  rank: number; name: string; team: string; avg: string; h: number; hr: number; rbi: number; ops: string;
}

export interface IndividualPitcher {
  rank: number; name: string; team: string; era: string; w: number; sv: number; hld: number; so: number; whip: string;
}

// 팀 기록용 (공격/수비 통합형)
export interface TeamRecordData {
  rank: number; name: string; 
  avg?: string; h?: number; hr?: number; rbi?: number; ops?: string; // 공격용
  era?: string; w?: number; l?: number; sv?: number; whip?: string; // 수비용
}