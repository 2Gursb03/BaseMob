import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Modal, Pressable } from 'react-native';
import RegularStandings from '@/components/standings/RegularStandings';
import PostSeasonStandings from '@/components/standings/PostSeasonStandings';
import KBOLogo from '@/assets/images/kbo.svg';
import { TeamStanding } from '@/components/standings/types';

// 에러 나던 SAMPLE_DATA 정의함
const SAMPLE_DATA: TeamStanding[] = [
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
];

const StandingsScreen = () => {
  const [mode, setMode] = useState('REGULAR');
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.header} onPress={() => setModalVisible(true)}>
        <Text style={styles.headerText}>
          {mode === 'REGULAR' ? '2025 KBO 정규리그 상세 순위' : '2025 KBO 포스트시즌 순위'} ▾
        </Text>
      </TouchableOpacity>

      {mode === 'REGULAR' ? <RegularStandings data={SAMPLE_DATA} /> : <PostSeasonStandings />}

      <Modal animationType="slide" transparent visible={modalVisible}>
        <Pressable style={styles.overlay} onPress={() => setModalVisible(false)}>
          <View style={styles.bottomSheet}>
            <View style={styles.handle} />
            <Text style={styles.sheetTitle}>순위 선택</Text>
            {['REGULAR', 'POST'].map((m) => (
              <TouchableOpacity key={m} style={styles.item} onPress={() => { setMode(m); setModalVisible(false); }}>
                <View style={[styles.radio, mode === m && styles.radioActive]}>
                  {mode === m && <View style={styles.radioInner} />}
                </View>
                <KBOLogo width={20} height={20} style={{ marginRight: 10 }} />
                <Text style={[styles.itemText, mode === m && styles.activeItemText]}>
                  {m === 'REGULAR' ? '2025 KBO 정규리그 상세 순위' : '2025 KBO 포스트시즌 순위'}
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
  header: { padding: 20, backgroundColor: '#fff' },
  headerText: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'flex-end' },
  bottomSheet: { backgroundColor: '#fff', borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 20, minHeight: 250 },
  handle: { width: 40, height: 5, backgroundColor: '#ccc', borderRadius: 2.5, alignSelf: 'center', marginBottom: 15 },
  sheetTitle: { fontSize: 14, color: '#666', marginBottom: 20 },
  item: { flexDirection: 'row', alignItems: 'center', paddingVertical: 15, borderBottomWidth: 0.5, borderColor: '#eee' },
  radio: { width: 20, height: 20, borderRadius: 10, borderWidth: 2, borderColor: '#ccc', marginRight: 12, alignItems: 'center', justifyContent: 'center' },
  radioActive: { borderColor: '#007AFF' },
  radioInner: { width: 10, height: 10, borderRadius: 5, backgroundColor: '#007AFF' },
  itemText: { fontSize: 15, color: '#333' },
  activeItemText: { fontWeight: 'bold', color: '#007AFF' },
});

export default StandingsScreen;