import React from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView } from 'react-native';
/* SVG 로고 컴포넌트 임포트 */
import LGLogo from '@/assets/images/lg.svg';
import SSGLogo from '@/assets/images/ssg.svg';
import DoosanLogo from '@/assets/images/doosan.svg';
import KiaLogo from '@/assets/images/kia.svg';
import LotteLogo from '@/assets/images/lotte.svg';
import SamsungLogo from '@/assets/images/samsung.svg';
import NCLogo from '@/assets/images/nc.svg';
import HanwhaLogo from '@/assets/images/hanhwa.svg';
import KTLogo from '@/assets/images/kt.svg';
import KiwoomLogo from '@/assets/images/kiwoom.svg';

interface TeamStanding {
  rank: number;
  name: string;
  played: number;
  win: number;
  loss: number;
  draw: number;
  pct: string;
}

// 팀명과 SVG 컴포넌트 매핑
const TeamLogos: { [key: string]: React.FC<any> } = {
  'LG': LGLogo,
  'SSG': SSGLogo,
  '두산': DoosanLogo,
  '기아': KiaLogo,
  '롯데': LotteLogo,
  '삼성': SamsungLogo,
  'NC': NCLogo,
  '한화': HanwhaLogo,
  'KT': KTLogo,
  '키움': KiwoomLogo,
};

const StandingsScreen = () => {
  const data: TeamStanding[] = [
    { rank: 1, name: 'LG', played: 144, win: 86, loss: 56, draw: 2, pct: '0.606' },
    { rank: 2, name: 'KT', played: 144, win: 79, loss: 62, draw: 3, pct: '0.560' },
    { rank: 3, name: 'SSG', played: 144, win: 76, loss: 65, draw: 3, pct: '0.539' },
    { rank: 4, name: 'NC', played: 144, win: 75, loss: 67, draw: 2, pct: '0.528' },
    { rank: 5, name: '두산', played: 144, win: 74, loss: 68, draw: 2, pct: '0.521' },
    { rank: 6, name: '기아', played: 144, win: 73, loss: 69, draw: 2, pct: '0.514' },
    { rank: 7, name: '롯데', played: 144, win: 67, loss: 76, draw: 1, pct: '0.469' },
    { rank: 8, name: '삼성', played: 144, win: 61, loss: 82, draw: 1, pct: '0.427' },
    { rank: 9, name: '한화', played: 144, win: 58, loss: 80, draw: 6, pct: '0.420' },
    { rank: 10, name: '키움', played: 144, win: 58, loss: 83, draw: 3, pct: '0.411' },
  ];

  const renderLogo = (teamName: string) => {
    const LogoComponent = TeamLogos[teamName];
    // 순위표에서는 로고를 경기 목록보다 조금 더 작게(20x20) 설정합니다
    return LogoComponent ? <LogoComponent width={20} height={20} /> : null;
  };

  const renderHeader = () => (
    <View style={styles.tableHeader}>
      <Text style={[styles.headerText, { flex: 0.8 }]}>순위</Text>
      <Text style={[styles.headerText, { flex: 2.5, textAlign: 'left' }]}>팀명</Text>
      <Text style={styles.headerText}>경기</Text>
      <Text style={styles.headerText}>승</Text>
      <Text style={styles.headerText}>패</Text>
      <Text style={styles.headerText}>무</Text>
      <Text style={styles.headerText}>승률</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>2025 KBO 정규리그 순위</Text>
      </View>
      <FlatList
        data={data}
        ListHeaderComponent={renderHeader}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text style={[styles.cell, { flex: 0.8, fontWeight: 'bold' }]}>{item.rank}</Text>
            {/* 로고와 팀명을 한 섹션으로 묶음 */}
            <View style={[styles.teamCell, { flex: 2.5 }]}>
              {renderLogo(item.name)}
              <Text style={styles.teamNameText}>{item.name}</Text>
            </View>
            <Text style={styles.cell}>{item.played}</Text>
            <Text style={styles.cell}>{item.win}</Text>
            <Text style={styles.cell}>{item.loss}</Text>
            <Text style={styles.cell}>{item.draw}</Text>
            <Text style={styles.cell}>{item.pct}</Text>
          </View>
        )}
      />
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
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderColor: '#eee',
    backgroundColor: '#fafafa',
  },
  headerText: { flex: 1, fontSize: 12, color: '#777', textAlign: 'center', fontWeight: 'bold' },
  row: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderColor: '#f2f2f2',
    alignItems: 'center',
  },
  cell: { flex: 1, fontSize: 13, textAlign: 'center', color: '#444' },
  teamCell: { flexDirection: 'row', alignItems: 'center' },
  teamNameText: { fontSize: 14, marginLeft: 8, fontWeight: '500', color: '#333' },
});

export default StandingsScreen;