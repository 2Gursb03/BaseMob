import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView, ScrollView, TouchableOpacity, Modal, Pressable } from 'react-native';
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
import KBOLogo from '@/assets/images/kbo.svg'; // KBO 공통 로고 추가

interface TeamStanding {
  rank: number;
  name: string;
  pct: string;
  gb: string;
  win: number;
  draw: number;
  loss: number;
  played: number;
  streak: string;
  avg: string;
  era: string;
  recent: string;
}

const TeamLogos: { [key: string]: React.FC<any> } = {
  'LG': LGLogo, 'SSG': SSGLogo, '두산': DoosanLogo, '기아': KiaLogo, '롯데': LotteLogo,
  '삼성': SamsungLogo, 'NC': NCLogo, '한화': HanwhaLogo, 'KT': KTLogo, '키움': KiwoomLogo,
};

// 2025년 데이터만 유지
const SEASON_DATA: { [key: string]: TeamStanding[] } = {
  'REGULAR': [
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
  ],
  'POST': [
    { rank: 1, name: 'LG', pct: '-', gb: '-', win: 4, draw: 0, loss: 1, played: 5, streak: '-', avg: '-', era: '-', recent: '승승패승승' },
    // 포스트시즌 순위 더미 데이터
  ]
};

const StandingsScreen = () => {
  const [currentMode, setCurrentMode] = useState('REGULAR'); // REGULAR or POST
  const [modalVisible, setModalVisible] = useState(false);

  const modes = [
    { id: 'REGULAR', label: '2025 KBO 정규리그 상세 순위' },
    { id: 'POST', label: '2025 KBO 포스트시즌 순위' },
  ];

  const renderLogo = (teamName: string) => {
    const LogoComponent = TeamLogos[teamName];
    return LogoComponent ? <LogoComponent width={18} height={18} /> : null;
  };

  const renderRecentGames = (recent: string) => (
    <View style={styles.recentContainer}>
      {recent?.split('').map((result, index) => {
        let dotStyle = styles.drawDot;
        if (result === '승') dotStyle = styles.winDot;
        if (result === '패') dotStyle = styles.lossDot;
        return (
          <View key={index} style={[styles.resultDot, dotStyle]}>
            <Text style={styles.resultText}>{result}</Text>
          </View>
        );
      })}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* 왼쪽 정렬 헤더 */}
      <TouchableOpacity 
        style={styles.titleContainer} 
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.title}>
          {modes.find(m => m.id === currentMode)?.label} ▾
        </Text>
      </TouchableOpacity>

      {/* 바텀 시트 스타일 모달 */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <Pressable style={styles.modalOverlay} onPress={() => setModalVisible(false)}>
          <View style={styles.bottomSheet}>
            <View style={styles.sheetHandle} />
            <Text style={styles.sheetTitle}>순위 선택</Text>
            {modes.map((mode) => (
              <TouchableOpacity 
                key={mode.id} 
                style={styles.sheetItem}
                onPress={() => {
                  setCurrentMode(mode.id);
                  setModalVisible(false);
                }}
              >
                {/* 라디오 버튼 스타일 */}
                <View style={[styles.radioCircle, currentMode === mode.id && styles.radioSelected]}>
                  {currentMode === mode.id && <View style={styles.radioInner} />}
                </View>
                <KBOLogo width={24} height={24} style={styles.kboLogo} />
                <Text style={[styles.sheetText, currentMode === mode.id && styles.activeText]}>
                  {mode.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </Pressable>
      </Modal>
      
      <ScrollView horizontal={true}>
        <FlatList
          data={SEASON_DATA[currentMode] || []}
          ListHeaderComponent={() => (
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
          )}
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
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  titleContainer: { padding: 15, backgroundColor: '#fff' },
  title: { fontSize: 18, fontWeight: 'bold', color: '#333', textAlign: 'left' }, // 왼쪽 정렬
  
  // 바텀 시트 스타일
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'flex-end' },
  bottomSheet: { backgroundColor: '#fff', borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 20, minHeight: 250 },
  sheetHandle: { width: 40, height: 5, backgroundColor: '#ccc', borderRadius: 2.5, alignSelf: 'center', marginBottom: 15 },
  sheetTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 20, color: '#666' },
  sheetItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 15, borderBottomWidth: 0.5, borderColor: '#eee' },
  radioCircle: { width: 20, height: 20, borderRadius: 10, borderWidth: 2, borderColor: '#ccc', alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  radioSelected: { borderColor: '#007AFF' },
  radioInner: { width: 10, height: 10, borderRadius: 5, backgroundColor: '#007AFF' },
  kboLogo: { marginRight: 10 },
  sheetText: { fontSize: 15, color: '#333' },
  activeText: { fontWeight: 'bold', color: '#007AFF' },

  tableHeader: { flexDirection: 'row', paddingVertical: 10, backgroundColor: '#fafafa', borderBottomWidth: 1, borderColor: '#eee' },
  headerText: { width: 45, fontSize: 11, color: '#777', textAlign: 'center', fontWeight: 'bold' },
  row: { flexDirection: 'row', paddingVertical: 12, borderBottomWidth: 1, borderColor: '#f2f2f2', alignItems: 'center' },
  cell: { width: 45, fontSize: 12, textAlign: 'center', color: '#444' },
  teamCell: { flexDirection: 'row', alignItems: 'center', paddingLeft: 10 },
  teamNameText: { fontSize: 13, marginLeft: 5, fontWeight: '500', color: '#333' },
  colRank: { width: 40 },
  colTeam: { width: 85 },
  colWide: { width: 60 },
  colExtraWide: { width: 110 },
  recentContainer: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
  resultDot: { width: 18, height: 18, borderRadius: 9, justifyContent: 'center', alignItems: 'center', marginHorizontal: 1 },
  resultText: { fontSize: 10, color: '#fff', fontWeight: 'bold' },
  winDot: { backgroundColor: '#2ecc71' },
  lossDot: { backgroundColor: '#e74c3c' },
  drawDot: { backgroundColor: '#95a5a6' },
});

export default StandingsScreen;