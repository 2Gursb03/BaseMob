import React from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView } from 'react-native';

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

export default function HomeScreen() {
  // 딱 5개의 경기만 포함된 더미 데이터
  const dummyMatches: Match[] = [
    { id: '1', homeTeam: 'LG', awayTeam: 'SSG', homeScore: 5, awayScore: 2, status: 'LIVE', inning: '7회 초' },
    { id: '2', homeTeam: '두산', awayTeam: '기아', homeScore: 0, awayScore: 0, status: 'UPCOMING', startTime: '18:30' },
    { id: '3', homeTeam: '롯데', awayTeam: '삼성', homeScore: 3, awayScore: 3, status: 'LIVE', inning: '5회 말' },
    { id: '4', homeTeam: 'NC', awayTeam: '한화', homeScore: 1, awayScore: 4, status: 'FINISHED' },
    { id: '5', homeTeam: 'KT', awayTeam: '키움', homeScore: 0, awayScore: 0, status: 'UPCOMING', startTime: '18:30' },
  ];

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
              <View style={styles.teamSection}>
                <Text style={styles.teamName}>{item.homeTeam}</Text>
                <Text style={styles.score}>{item.status === 'UPCOMING' ? '-' : item.homeScore}</Text>
              </View>
              
              <View style={styles.statusSection}>
                <Text style={item.status === 'LIVE' ? styles.liveText : styles.statusText}>
                  {item.status === 'LIVE' ? item.inning : item.status === 'FINISHED' ? '종료' : item.startTime}
                </Text>
              </View>

              <View style={styles.teamSection}>
                <Text style={styles.score}>{item.status === 'UPCOMING' ? '-' : item.awayScore}</Text>
                <Text style={styles.teamName}>{item.awayTeam}</Text>
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
    padding: 20, 
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
  },
  matchInfo: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  teamSection: { flexDirection: 'row', alignItems: 'center', flex: 1, justifyContent: 'space-around' },
  teamName: { fontSize: 16, fontWeight: 'bold' },
  score: { fontSize: 20, fontWeight: '800' },
  statusSection: { flex: 0.8, alignItems: 'center' },
  statusText: { fontSize: 12, color: '#888' },
  liveText: { fontSize: 12, color: '#e74c3c', fontWeight: 'bold' }
});