import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Modal, Pressable } from 'react-native';
import RegularStandings from '@/components/standings/RegularStandings';
import PostSeasonStandings from '@/components/standings/PostSeasonStandings';
import TeamRecords from '../../components/standings/TeamRecords';
import IndividualBatterRecords from '@/components/standings/IndividualBatterRecords';
import IndividualPitcherRecords from '../../components/standings/IndividualPitcherRecords';
import KBOLogo from '@/assets/images/kbo.svg';
import { TeamStanding, TeamRecordData, IndividualBatter, IndividualPitcher } from '@/components/standings/types';

const StandingsScreen = () => {
  // 1. 상태 관리 (탭 및 순위 모드)
  const [topTab, setTopTab] = useState('TEAM_RANK'); 
  const [rankMode, setRankMode] = useState('REGULAR'); // REGULAR or POST
  const [selectedYear, setSelectedYear] = useState('2025');
  const [modalVisible, setModalVisible] = useState(false);

  const tabs = [
    { id: 'TEAM_RANK', label: '팀 순위' },
    { id: 'TEAM_REC', label: '팀 기록' },
    { id: 'PLAYER_BAT', label: '타자 기록' },
    { id: 'PLAYER_PIT', label: '투수 기록' },
  ];

  // 2. 콘텐츠 렌더링 로직
  const renderContent = () => {
    switch (topTab) {
      case 'TEAM_RANK':
        return rankMode === 'REGULAR' 
          ? <RegularStandings data={REG_DATA} /> 
          : <PostSeasonStandings />;
      case 'TEAM_REC':
        return <TeamRecords battingData={TEAM_BAT_DATA} pitchingData={TEAM_PIT_DATA} />;
      case 'PLAYER_BAT':
        return <IndividualBatterRecords data={IND_BAT_DATA} />;
      case 'PLAYER_PIT':
        return <IndividualPitcherRecords data={IND_PIT_DATA} />;
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* 상단 메인 탭 */}
      <View style={styles.tabBar}>
        {tabs.map((tab) => (
          <TouchableOpacity 
            key={tab.id} 
            style={[styles.tabItem, topTab === tab.id && styles.activeTabItem]}
            onPress={() => setTopTab(tab.id)}
          >
            <Text style={[styles.tabLabel, topTab === tab.id && styles.activeTabLabel]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* 팀 순위일 때만 보이는 년도/리그 선택 바 */}
      {topTab === 'TEAM_RANK' && (
        <TouchableOpacity style={styles.yearSelector} onPress={() => setModalVisible(true)}>
          <Text style={styles.yearSelectorText}>
            {selectedYear} KBO {rankMode === 'REGULAR' ? '정규리그 상세 순위' : '포스트시즌 순위'} ▾
          </Text>
        </TouchableOpacity>
      )}

      <View style={{ flex: 1 }}>
        {renderContent()}
      </View>

      {/* 년도 및 리그 선택 바텀 시트 */}
      <Modal animationType="slide" transparent visible={modalVisible}>
        <Pressable style={styles.overlay} onPress={() => setModalVisible(false)}>
          <View style={styles.bottomSheet}>
            <View style={styles.handle} />
            <Text style={styles.sheetTitle}>리그 선택</Text>
            {[
              { id: 'REGULAR', label: `${selectedYear} KBO 정규리그 상세 순위` },
              { id: 'POST', label: `${selectedYear} KBO 포스트시즌 순위` }
            ].map((m) => (
              <TouchableOpacity 
                key={m.id} 
                style={styles.sheetItem} 
                onPress={() => { setRankMode(m.id); setModalVisible(false); }}
              >
                <View style={[styles.radio, rankMode === m.id && styles.radioActive]}>
                  {rankMode === m.id && <View style={styles.radioInner} />}
                </View>
                <KBOLogo width={20} height={20} style={{ marginRight: 12 }} />
                <Text style={[styles.itemText, rankMode === m.id && styles.activeItemText]}>
                  {m.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  tabBar: { flexDirection: 'row', borderBottomWidth: 1, borderColor: '#eee', backgroundColor: '#fff' },
  tabItem: { flex: 1, paddingVertical: 15, alignItems: 'center', borderBottomWidth: 2, borderBottomColor: 'transparent' },
  activeTabItem: { borderBottomColor: '#007AFF' },
  tabLabel: { fontSize: 14, color: '#999', fontWeight: '500' },
  activeTabLabel: { color: '#007AFF', fontWeight: 'bold' },
  
  // 년도 선택 바 스타일
  yearSelector: { padding: 15, backgroundColor: '#fcfcfc', borderBottomWidth: 1, borderBottomColor: '#f0f0f0' },
  yearSelectorText: { fontSize: 16, fontWeight: 'bold', color: '#333' },

  // 바텀 시트 스타일
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'flex-end' },
  bottomSheet: { backgroundColor: '#fff', borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 20, paddingBottom: 40 },
  handle: { width: 40, height: 5, backgroundColor: '#eee', borderRadius: 3, alignSelf: 'center', marginBottom: 20 },
  sheetTitle: { fontSize: 14, color: '#999', marginBottom: 15, fontWeight: 'bold' },
  sheetItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 16, borderBottomWidth: 0.5, borderColor: '#f5f5f5' },
  radio: { width: 20, height: 20, borderRadius: 10, borderWidth: 2, borderColor: '#ddd', marginRight: 12, alignItems: 'center', justifyContent: 'center' },
  radioActive: { borderColor: '#007AFF' },
  radioInner: { width: 10, height: 10, borderRadius: 5, backgroundColor: '#007AFF' },
  itemText: { fontSize: 15, color: '#444' },
  activeItemText: { fontWeight: 'bold', color: '#007AFF' },
});

// --- 샘플 데이터 (10개 구단 및 선수 꽉 채움) ---

const REG_DATA: TeamStanding[] = [
  { rank: 1, name: 'LG', pct: '0.606', gb: '-', win: 86, draw: 2, loss: 56, played: 144, streak: '3승', era: '3.67', avg: '.280', recent: '승승승패패' },
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

const TEAM_BAT_DATA: TeamRecordData[] = REG_DATA.map((d, i) => ({ rank: i+1, name: d.name, avg: '.27'+i, h: 1300-i*10, hr: 120-i*5, rbi: 700-i*10, ops: '.7'+(80-i) }));
const TEAM_PIT_DATA: TeamRecordData[] = REG_DATA.map((d, i) => ({ rank: i+1, name: d.name, era: (3.5+i*0.1).toFixed(2), w: 85-i*3, l: 55+i*3, sv: 40-i*2, whip: (1.2+i*0.03).toFixed(2) }));

const IND_BAT_DATA: IndividualBatter[] = [
  { rank: 1, name: '김도영', team: '기아', avg: '.345', h: 185, hr: 35, rbi: 110, ops: '1.020' },
  { rank: 2, name: '구자욱', team: '삼성', avg: '.338', h: 178, hr: 28, rbi: 95, ops: '.980' },
  { rank: 3, name: '에레디아', team: 'SSG', avg: '.335', h: 182, hr: 20, rbi: 105, ops: '.920' },
  { rank: 4, name: '홍창기', team: 'LG', avg: '.330', h: 188, hr: 5, rbi: 65, ops: '.880' },
  { rank: 5, name: '로하스', team: 'KT', avg: '.325', h: 170, hr: 32, rbi: 100, ops: '.995' },
];

const IND_PIT_DATA: IndividualPitcher[] = [
  { rank: 1, name: '네일', team: '기아', era: '2.55', w: 15, sv: 0, hld: 0, so: 170, whip: '1.10' },
  { rank: 2, name: '원태인', team: '삼성', era: '3.10', w: 14, sv: 0, hld: 0, so: 155, whip: '1.20' },
  { rank: 3, name: '엔스', team: 'LG', era: '3.45', w: 13, sv: 0, hld: 0, so: 165, whip: '1.25' },
  { rank: 4, name: '오승환', team: '삼성', era: '3.80', w: 3, sv: 35, hld: 0, so: 60, whip: '1.30' },
  { rank: 5, name: '정해영', team: '기아', era: '2.80', w: 2, sv: 32, hld: 0, so: 55, whip: '1.15' },
];

export default StandingsScreen;