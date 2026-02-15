import React from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView } from 'react-native';

// KBO 순위 데이터 타입 정의
interface TeamStanding {
  rank: number;
  name: string;
  played: number;
  win: number;
  loss: number;
  draw: number;
  pct: string; 
  gb: string;  
}

const StandingsScreen = () => {
  // KBO 10개 구단 전체 데이터 (임시 데이터)
  const data: TeamStanding[] = [
    { rank: 1, name: 'LG', played: 144, win: 86, loss: 56, draw: 2, pct: '0.606', gb: '-' },
    { rank: 2, name: 'KT', played: 144, win: 79, loss: 62, draw: 3, pct: '0.560', gb: '6.5' },
    { rank: 3, name: 'SSG', played: 144, win: 76, loss: 65, draw: 3, pct: '0.539', gb: '9.5' },
    { rank: 4, name: 'NC', played: 144, win: 75, loss: 67, draw: 2, pct: '0.528', gb: '11.0' },
    { rank: 5, name: '두산', played: 144, win: 74, loss: 68, draw: 2, pct: '0.521', gb: '12.0' },
    { rank: 6, name: '기아', played: 144, win: 73, loss: 69, draw: 2, pct: '0.514', gb: '13.0' },
    { rank: 7, name: '롯데', played: 144, win: 67, loss: 76, draw: 1, pct: '0.469', gb: '19.5' },
    { rank: 8, name: '삼성', played: 144, win: 61, loss: 82, draw: 1, pct: '0.427', gb: '25.5' },
    { rank: 9, name: '한화', played: 144, win: 58, loss: 80, draw: 6, pct: '0.420', gb: '26.0' },
    { rank: 10, name: '키움', played: 144, win: 58, loss: 83, draw: 3, pct: '0.411', gb: '27.5' },
  ];

  const renderHeader = () => (
    <View style={styles.tableHeader}>
      <Text style={[styles.headerText, { flex: 0.8 }]}>순위</Text>
      <Text style={[styles.headerText, { flex: 2, textAlign: 'left' }]}>팀명</Text>
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
            <Text style={[styles.cell, { flex: 2, textAlign: 'left', fontWeight: '500' }]}>{item.name}</Text>
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
});

export default StandingsScreen;