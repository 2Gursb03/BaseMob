import React from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView, ScrollView } from 'react-native';
/* SVG 로고 컴포넌트 임포트 */
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

// 확장된 데이터 타입 정의
interface TeamStanding {
  rank: number;
  name: string;
  pct: string;    // 승률
  gb: string;     // 게임차
  win: number;    // 승
  draw: number;   // 무
  loss: number;   // 패
  played: number; // 경기
  streak: string; // 연속
  avg: string;    // 타율
  era: string;    // 평균자책
  recent: string; // 최근 5경기 (ex: '승승패무승')
}

const TeamLogos: { [key: string]: React.FC<any> } = {
  'LG': LGLogo, 'SSG': SSGLogo, '두산': DoosanLogo, '기아': KiaLogo, '롯데': LotteLogo,
  '삼성': SamsungLogo, 'NC': NCLogo, '한화': HanwhaLogo, 'KT': KTLogo, '키움': KiwoomLogo,
};

const StandingsScreen = () => {
  // 배지 UI 확인을 위한 실감 데이터
  const data: TeamStanding[] = [
    { rank: 1, name: 'LG', pct: '0.606', gb: '-', win: 86, draw: 2, loss: 56, played: 144, streak: '3승', avg: '.280', era: '3.67', recent: '승승승패패' },
    { rank: 2, name: 'KT', pct: '0.560', gb: '6.5', win: 79, draw: 3, loss: 62, played: 144, streak: '1패', avg: '.265', era: '3.95', recent: '패승패승패' },
    { rank: 3, name: 'SSG', pct: '0.539', gb: '9.5', win: 76, draw: 3, loss: 65, played: 144, streak: '2승', avg: '.272', era: '4.12', recent: '승승무패승' },
    { rank: 4, name: 'NC', pct: '0.528', gb: '11.0', win: 75, draw: 2, loss: 67, played: 144, streak: '1승', avg: '.270', era: '4.01', recent: '승패패승승' },
    { rank: 5, name: '두산', pct: '0.521', gb: '12.0', win: 74, draw: 2, loss: 68, played: 144, streak: '2패', avg: '.255', era: '3.88', recent: '패패승승패' },
    { rank: 6, name: '기아', pct: '0.514', gb: '13.0', win: 73, draw: 2, loss: 69, played: 144, streak: '1패', avg: '.275', era: '4.25', recent: '패승승패패' },
    { rank: 7, name: '롯데', pct: '0.469', gb: '19.5', win: 67, draw: 1, loss: 76, played: 144, streak: '2승', avg: '.263', era: '4.41', recent: '승승패패무' },
    { rank: 8, name: '삼성', pct: '0.427', gb: '25.5', win: 61, draw: 1, loss: 82, played: 144, streak: '3패', avg: '.261', era: '4.60', recent: '패패패승승' },
    { rank: 9, name: '한화', pct: '0.420', gb: '26.0', win: 58, draw: 6, loss: 80, played: 144, streak: '1승', avg: '.248', era: '4.52', recent: '승무무패패' },
    { rank: 10, name: '키움', pct: '0.411', gb: '27.5', win: 58, draw: 3, loss: 83, played: 144, streak: '4패', avg: '.258', era: '4.88', recent: '패패패패승' },
  ];

  const renderLogo = (teamName: string) => {
    const LogoComponent = TeamLogos[teamName];
    return LogoComponent ? <LogoComponent width={18} height={18} /> : null;
  };

  // 최근 5경기 승패 배지 렌더링 함수 (색상 적용)
  const renderRecentGames = (recent: string) => {
    return (
      <View style={styles.recentContainer}>
        {recent.split('').map((result, index) => {
          let dotStyle = styles.drawDot;
          if (result === '승') dotStyle = styles.winDot;  // 초록색
          if (result === '패') dotStyle = styles.lossDot; // 빨간색

          return (
            <View key={index} style={[styles.resultDot, dotStyle]}>
              <Text style={styles.resultText}>{result}</Text>
            </View>
          );
        })}
      </View>
    );
  };

  const renderHeader = () => (
    <View style={styles.tableHeader}>
      <Text style={[styles.headerText, styles.colRank]}>순위</Text>
      <Text style={[styles.headerText, styles.colTeam]}>팀명</Text>
      <Text style={styles.headerText}>승률</Text>
      <Text style={styles.headerText}>게임차</Text>
      <Text style={styles.headerText}>승</Text>
      <Text style={styles.headerText}>무</Text>
      <Text style={styles.headerText}>패</Text>
      <Text style={styles.headerText}>경기</Text>
      <Text style={[styles.headerText, styles.colWide]}>연속</Text>
      <Text style={styles.headerText}>타율</Text>
      <Text style={[styles.headerText, styles.colWide]}>평균자책</Text>
      <Text style={[styles.headerText, styles.colExtraWide]}>최근 5경기</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>2025 KBO 정규리그 상세 순위</Text>
      </View>
      
      {/* 가로 스크롤 구현 */}
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={true}>
        <View>
          <FlatList
            data={data}
            ListHeaderComponent={renderHeader}
            keyExtractor={(item) => item.name}
            renderItem={({ item }) => (
              <View style={styles.row}>
                <Text style={[styles.cell, styles.colRank, { fontWeight: 'bold' }]}>{item.rank}</Text>
                <View style={[styles.teamCell, styles.colTeam]}>
                  {renderLogo(item.name)}
                  <Text style={styles.teamNameText}>{item.name}</Text>
                </View>
                <Text style={styles.cell}>{item.pct}</Text>
                <Text style={styles.cell}>{item.gb}</Text>
                <Text style={styles.cell}>{item.win}</Text>
                <Text style={styles.cell}>{item.draw}</Text>
                <Text style={styles.cell}>{item.loss}</Text>
                <Text style={styles.cell}>{item.played}</Text>
                <Text style={[styles.cell, styles.colWide]}>{item.streak}</Text>
                <Text style={styles.cell}>{item.avg}</Text>
                <Text style={[styles.cell, styles.colWide]}>{item.era}</Text>
                <View style={[styles.cell, styles.colExtraWide]}>
                  {renderRecentGames(item.recent)}
                </View>
              </View>
            )}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  titleContainer: { padding: 15, backgroundColor: '#f8f9fa', borderBottomWidth: 1, borderColor: '#eee' },
  title: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  tableHeader: {
    flexDirection: 'row',
    paddingVertical: 10,
    backgroundColor: '#fafafa',
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  headerText: { width: 45, fontSize: 11, color: '#777', textAlign: 'center', fontWeight: 'bold' },
  row: {
    flexDirection: 'row',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: '#f2f2f2',
    alignItems: 'center',
  },
  cell: { width: 45, fontSize: 12, textAlign: 'center', color: '#444' },
  teamCell: { flexDirection: 'row', alignItems: 'center', paddingLeft: 10 },
  teamNameText: { fontSize: 13, marginLeft: 5, fontWeight: '500', color: '#333' },
  // 컬럼별 너비 설정
  colRank: { width: 40 },
  colTeam: { width: 85 },
  colWide: { width: 60 },
  colExtraWide: { width: 110 }, 
  // 최근 5경기 배지 스타일
  recentContainer: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
  resultDot: {
    width: 18,
    height: 18,
    borderRadius: 9,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 1,
  },
  resultText: { fontSize: 10, color: '#fff', fontWeight: 'bold' },
  winDot: { backgroundColor: '#2ecc71' },  // 승: 초록색
  lossDot: { backgroundColor: '#e74c3c' }, // 패: 빨간색
  drawDot: { backgroundColor: '#95a5a6' }, // 무: 회색
});

export default StandingsScreen;