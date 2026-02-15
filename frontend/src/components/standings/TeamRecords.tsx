import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView, TouchableOpacity } from 'react-native';
import { TeamLogos, TeamRecordData } from './types';

const TeamRecords = ({ battingData, pitchingData }: { battingData: TeamRecordData[], pitchingData: TeamRecordData[] }) => {
  const [subTab, setSubTab] = useState('OFFENSE'); // OFFENSE or DEFENSE

  const renderHeader = () => (
    <View style={styles.tableHeader}>
      <Text style={[styles.headerText, { width: 40 }]}>순위</Text>
      <Text style={[styles.headerText, { width: 85 }]}>팀명</Text>
      {subTab === 'OFFENSE' ? (
        <><Text style={styles.headerText}>타율</Text><Text style={styles.headerText}>안타</Text><Text style={styles.headerText}>홈런</Text><Text style={styles.headerText}>타점</Text><Text style={styles.headerText}>OPS</Text></>
      ) : (
        <><Text style={styles.headerText}>ERA</Text><Text style={styles.headerText}>승</Text><Text style={styles.headerText}>패</Text><Text style={styles.headerText}>세이브</Text><Text style={styles.headerText}>WHIP</Text></>
      )}
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.subTabContainer}>
        <TouchableOpacity onPress={() => setSubTab('OFFENSE')} style={[styles.subTab, subTab === 'OFFENSE' && styles.activeSubTab]}>
          <Text style={[styles.subTabText, subTab === 'OFFENSE' && styles.activeSubTabText]}>팀 공격</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setSubTab('DEFENSE')} style={[styles.subTab, subTab === 'DEFENSE' && styles.activeSubTab]}>
          <Text style={[styles.subTabText, subTab === 'DEFENSE' && styles.activeSubTabText]}>팀 수비</Text>
        </TouchableOpacity>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <FlatList
          data={subTab === 'OFFENSE' ? battingData : pitchingData}
          ListHeaderComponent={renderHeader}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => {
            const Logo = TeamLogos[item.name];
            return (
              <View style={styles.row}>
                <Text style={[styles.cell, { width: 40, fontWeight: 'bold' }]}>{item.rank}</Text>
                <View style={[styles.teamCell, { width: 85 }]}>{Logo && <Logo width={18} height={18} />}<Text style={styles.teamNameText}>{item.name}</Text></View>
                {subTab === 'OFFENSE' ? (
                  <><Text style={styles.cell}>{item.avg}</Text><Text style={styles.cell}>{item.h}</Text><Text style={styles.cell}>{item.hr}</Text><Text style={styles.cell}>{item.rbi}</Text><Text style={styles.cell}>{item.ops}</Text></>
                ) : (
                  <><Text style={styles.cell}>{item.era}</Text><Text style={styles.cell}>{item.w}</Text><Text style={styles.cell}>{item.l}</Text><Text style={styles.cell}>{item.sv}</Text><Text style={styles.cell}>{item.whip}</Text></>
                )}
              </View>
            );
          }}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  subTabContainer: { flexDirection: 'row', padding: 10, gap: 10 },
  subTab: { paddingHorizontal: 15, paddingVertical: 6, borderRadius: 20, backgroundColor: '#f0f0f0' },
  activeSubTab: { backgroundColor: '#007AFF' },
  subTabText: { fontSize: 12, color: '#666' },
  activeSubTabText: { color: '#fff', fontWeight: 'bold' },
  tableHeader: { flexDirection: 'row', paddingVertical: 10, backgroundColor: '#fafafa', borderBottomWidth: 1, borderColor: '#eee' },
  headerText: { width: 55, fontSize: 11, color: '#777', textAlign: 'center', fontWeight: 'bold' },
  row: { flexDirection: 'row', paddingVertical: 12, borderBottomWidth: 1, borderColor: '#f2f2f2', alignItems: 'center' },
  cell: { width: 55, fontSize: 12, textAlign: 'center', color: '#444' },
  teamCell: { flexDirection: 'row', alignItems: 'center', paddingLeft: 10 },
  teamNameText: { fontSize: 13, marginLeft: 5 },
});

export default TeamRecords;