import React from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView } from 'react-native';
/* SVG 로고들을 컴포넌트로 가져오기 */
import LGLogo from '@/assets/images/lg.svg';
import SSGLogo from '@/assets/images/ssg.svg';
import DoosanLogo from '@/assets/images/doosan.svg';
import KiaLogo from '@/assets/images/kia.svg';
import LotteLogo from '@/assets/images/lotte.svg';
import SamsungLogo from '@/assets/images/samsung.svg';
import NCLogo from '@/assets/images/nc.svg';
import HanhwaLogo from '@/assets/images/hanhwa.svg';
import KTLogo from '@/assets/images/kt.svg';
import KiwoomLogo from '@/assets/images/kiwoom.svg';

// 경기 데이터 타입 정의
interface Match {
  id: string;
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  status: 'LIVE' | 'FINISHED' | 'UPCOMING';
  inning?: string;
  startTime?: string;
}

// 팀명과 SVG 컴포넌트 매핑 객체
const TeamLogos: { [key: string]: React.FC<any> } = {
  'LG': LGLogo,
  'SSG': SSGLogo,
  '두산': DoosanLogo,
  '기아': KiaLogo,
  '롯데': LotteLogo,
  '삼성': SamsungLogo,
  'NC': NCLogo,
  '한화': HanhwaLogo,
  'KT': KTLogo,
  '키움': KiwoomLogo,
};

export default function HomeScreen() {
  const dummyMatches: Match[] = [
    { id: '1', homeTeam: 'LG', awayTeam: 'SSG', homeScore: 5, awayScore: 2, status: 'LIVE', inning: '7회 초' },
    { id: '2', homeTeam: '두산', awayTeam: '기아', homeScore: 0, awayScore: 0, status: 'UPCOMING', startTime: '18:30' },
    { id: '3', homeTeam: '롯데', awayTeam: '삼성', homeScore: 3, awayScore: 3, status: 'LIVE', inning: '5회 말' },
    { id: '4', homeTeam: 'NC', awayTeam: '한화', homeScore: 1, awayScore: 4, status: 'FINISHED' },
    { id: '5', homeTeam: 'KT', awayTeam: '키움', homeScore: 0, awayScore: 0, status: 'UPCOMING', startTime: '18:30' },
  ];

  // 로고를 렌더링하는 헬퍼 함수
  const renderLogo = (teamName: string) => {
    const LogoComponent = TeamLogos[teamName];
    return LogoComponent ? <LogoComponent width={30} height={30} /> : null;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>오늘의 주요 경기 (5)</Text>
      </View>
      
      <FlatList
        data={dummyMatches}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.matchInfo}>
              {/* 홈 팀 섹션: 로고 - 팀명 - 점수 */}
              <View style={styles.teamSection}>
                {renderLogo(item.homeTeam)}
                <Text style={styles.teamName}>{item.homeTeam}</Text>
                <Text style={styles.score}>{item.status === 'UPCOMING' ? '-' : item.homeScore}</Text>
              </View>
              
              {/* 경기 상태 섹션 */}
              <View style={styles.statusSection}>
                <Text style={item.status === 'LIVE' ? styles.liveText : styles.statusText}>
                  {item.status === 'LIVE' ? item.inning : item.status === 'FINISHED' ? '종료' : item.startTime}
                </Text>
              </View>

              {/* 원정 팀 섹션: 점수 - 팀명 - 로고 */}
              <View style={styles.teamSection}>
                <Text style={styles.score}>{item.status === 'UPCOMING' ? '-' : item.awayScore}</Text>
                <Text style={styles.teamName}>{item.awayTeam}</Text>
                {renderLogo(item.awayTeam)}
              </View>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  header: { padding: 20, backgroundColor: '#fff', borderBottomWidth: 1, borderColor: '#eee' },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  card: { 
    backgroundColor: '#fff', 
    marginHorizontal: 15, 
    marginTop: 15, 
    padding: 15, 
    borderRadius: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
  },
  matchInfo: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  teamSection: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    flex: 1.2, 
    justifyContent: 'space-between' // 로고와 이름, 점수 간격 조절
  },
  teamName: { fontSize: 15, fontWeight: 'bold', marginHorizontal: 5 },
  score: { fontSize: 20, fontWeight: '800', minWidth: 25, textAlign: 'center' },
  statusSection: { flex: 0.6, alignItems: 'center' },
  statusText: { fontSize: 12, color: '#888' },
  liveText: { fontSize: 12, color: '#e74c3c', fontWeight: 'bold' }
});