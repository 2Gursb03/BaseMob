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
}

export default function HomeScreen() {
  const dummyMatches: Match[] = [
    { id: '1', homeTeam: 'LG', awayTeam: 'SSG', homeScore: 5, awayScore: 2, status: 'LIVE', inning: '7회 초' },
    { id: '2', homeTeam: '두산', awayTeam: '기아', homeScore: 0, awayScore: 0, status: 'UPCOMING' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>BaseMob 경기 일정</Text>
      </View>
      
      <FlatList
        data={dummyMatches}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text>{item.homeTeam} {item.homeScore} : {item.awayScore} {item.awayTeam}</Text>
            <Text style={item.status === 'LIVE' ? styles.live : styles.status}>
              {item.status === 'LIVE' ? item.inning : '경기 예정'}
            </Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { padding: 20, borderBottomWidth: 1, borderColor: '#eee' },
  headerTitle: { fontSize: 20, fontWeight: 'bold' },
  card: { padding: 20, margin: 10, backgroundColor: '#f9f9f9', borderRadius: 10 },
  status: { color: '#888', marginTop: 5 },
  live: { color: 'red', fontWeight: 'bold', marginTop: 5 }
});