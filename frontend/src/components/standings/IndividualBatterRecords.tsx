import React from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView } from 'react-native';
import { IndividualBatter } from './types';

const IndividualBatterRecords = ({ data }: { data: IndividualBatter[] }) => (
  <ScrollView horizontal showsHorizontalScrollIndicator={false}>
    <FlatList
      data={data}
      ListHeaderComponent={() => (
        <View style={styles.tableHeader}>
          <Text style={[styles.headerText, { width: 40 }]}>순위</Text>
          <Text style={[styles.headerText, { width: 100 }]}>선수/팀</Text>
          <Text style={styles.headerText}>타율</Text>
          <Text style={styles.headerText}>안타</Text>
          <Text style={styles.headerText}>홈런</Text>
          <Text style={styles.headerText}>타점</Text>
          <Text style={styles.headerText}>OPS</Text>
        </View>
      )}
      renderItem={({ item }) => (
        <View style={styles.row}>
          <Text style={[styles.cell, { width: 40, fontWeight: 'bold' }]}>{item.rank}</Text>
          <View style={[styles.playerCell, { width: 100 }]}>
            <Text style={styles.playerName}>{item.name}</Text>
            <Text style={styles.playerTeam}>{item.team}</Text>
          </View>
          <Text style={[styles.cell, { fontWeight: 'bold' }]}>{item.avg}</Text>
          <Text style={styles.cell}>{item.h}</Text>
          <Text style={styles.cell}>{item.hr}</Text>
          <Text style={styles.cell}>{item.rbi}</Text>
          <Text style={[styles.cell, { color: '#007AFF' }]}>{item.ops}</Text>
        </View>
      )}
    />
  </ScrollView>
);

const styles = StyleSheet.create({
  tableHeader: { flexDirection: 'row', paddingVertical: 10, backgroundColor: '#fafafa', borderBottomWidth: 1, borderColor: '#eee' },
  headerText: { width: 60, fontSize: 11, color: '#777', textAlign: 'center', fontWeight: 'bold' },
  row: { flexDirection: 'row', paddingVertical: 12, borderBottomWidth: 1, borderColor: '#f2f2f2', alignItems: 'center' },
  cell: { width: 60, fontSize: 12, textAlign: 'center', color: '#444' },
  playerCell: { paddingLeft: 10 },
  playerName: { fontSize: 13, fontWeight: 'bold', color: '#333' },
  playerTeam: { fontSize: 11, color: '#999' },
});

export default IndividualBatterRecords;