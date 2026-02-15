import React from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView } from 'react-native';
import { TeamLogos, TeamStanding } from './types'; // 공통 타입/로고 관리 권장

const RegularStandings = ({ data }: { data: TeamStanding[] }) => {
  const renderRecentGames = (recent: string) => (
    <View style={styles.recentContainer}>
      {recent?.split('').map((result, index) => (
        <View key={index} style={[styles.resultDot, result === '승' ? styles.winDot : result === '패' ? styles.lossDot : styles.drawDot]}>
          <Text style={styles.resultText}>{result}</Text>
        </View>
      ))}
    </View>
  );

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <FlatList
        data={data}
        ListHeaderComponent={() => (
          <View style={styles.tableHeader}>
            <Text style={[styles.headerText, { width: 40 }]}>순위</Text>
            <Text style={[styles.headerText, { width: 85 }]}>팀명</Text>
            <Text style={styles.headerText}>승률</Text>
            <Text style={styles.headerText}>게임차</Text>
            <Text style={styles.headerText}>승</Text>
            <Text style={styles.headerText}>무</Text>
            <Text style={styles.headerText}>패</Text>
            <Text style={[styles.headerText, { width: 60 }]}>연속</Text>
            <Text style={[styles.headerText, { width: 110 }]}>최근 5경기</Text>
          </View>
        )}
        renderItem={({ item }) => {
          const Logo = TeamLogos[item.name];
          return (
            <View style={styles.row}>
              <Text style={[styles.cell, { width: 40, fontWeight: 'bold' }]}>{item.rank}</Text>
              <View style={[styles.teamCell, { width: 85 }]}>
                {Logo && <Logo width={18} height={18} />}
                <Text style={styles.teamNameText}>{item.name}</Text>
              </View>
              <Text style={styles.cell}>{item.pct}</Text>
              <Text style={styles.cell}>{item.gb}</Text>
              <Text style={styles.cell}>{item.win}</Text>
              <Text style={styles.cell}>{item.draw}</Text>
              <Text style={styles.cell}>{item.loss}</Text>
              <Text style={[styles.cell, { width: 60 }]}>{item.streak}</Text>
              <View style={[styles.cell, { width: 110 }]}>{renderRecentGames(item.recent)}</View>
            </View>
          );
        }}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  tableHeader: { flexDirection: 'row', paddingVertical: 10, backgroundColor: '#fafafa', borderBottomWidth: 1, borderColor: '#eee' },
  headerText: { width: 45, fontSize: 11, color: '#777', textAlign: 'center', fontWeight: 'bold' },
  row: { flexDirection: 'row', paddingVertical: 12, borderBottomWidth: 1, borderColor: '#f2f2f2', alignItems: 'center' },
  cell: { width: 45, fontSize: 12, textAlign: 'center', color: '#444' },
  teamCell: { flexDirection: 'row', alignItems: 'center', paddingLeft: 10 },
  teamNameText: { fontSize: 13, marginLeft: 5, fontWeight: '500' },
  recentContainer: { flexDirection: 'row', justifyContent: 'center' },
  resultDot: { width: 18, height: 18, borderRadius: 9, justifyContent: 'center', alignItems: 'center', marginHorizontal: 1 },
  resultText: { fontSize: 10, color: '#fff', fontWeight: 'bold' },
  winDot: { backgroundColor: '#2ecc71' },
  lossDot: { backgroundColor: '#e74c3c' },
  drawDot: { backgroundColor: '#95a5a6' },
});

export default RegularStandings;