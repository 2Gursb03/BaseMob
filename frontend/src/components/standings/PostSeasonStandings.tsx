import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { TeamLogos } from './types';
import KBOLogo from '@/assets/images/kbo.svg';

// 매치에 참가하는 팀 정보 타입 정의
interface MatchTeamInfo {
  name: string;
  seed: number; // 시드(순위): 낮을수록 상위 랭크 (예: 4위가 5위보다 위)
  isWinner: boolean;
}

// 단일 팀 행을 그리는 서브 컴포넌트
const TeamRow = ({ team }: { team: MatchTeamInfo }) => {
  const Logo = TeamLogos[team.name];
  const teamStyle = team.isWinner ? styles.winnerText : styles.loserText;
  
  return (
    <View style={styles.teamRow}>
      <View style={styles.logoWrapper}>
        {Logo && <Logo width={24} height={24} />}
      </View>
      <Text style={[styles.teamNameBase, teamStyle]}>{team.name}</Text>
      {!team.isWinner && <Text style={styles.loserLabel}> 패</Text>}
    </View>
  );
};


// 브래킷 노드 (챔피언 vs 일반 매치 분기 처리)
const BracketNode = ({ title, teams, scores, isChampion = false }: any) => {
  // 1. 챔피언 카드 처리 (기존 유지)
  if (isChampion) {
    const championTeam = teams[0];
    const Logo = TeamLogos[championTeam.name];
    return (
      <View style={styles.nodeContainer}>
        <View style={styles.championDeco}>
          <KBOLogo width={28} height={28} />
          <Text style={styles.championYear}>2025</Text>
        </View>
        <View style={[styles.titleBadge, { backgroundColor: '#e74c3c' }]}>
          <Text style={styles.titleBadgeText}>{title}</Text>
        </View>
        <View style={[styles.nodeCard, styles.winnerCard]}>
          <View style={styles.teamHeader}>
            {Logo && <Logo width={40} height={40} />}
            <Text style={[styles.teamNameText, styles.championText]}>{championTeam.name}</Text>
          </View>
        </View>
      </View>
    );
  }

  // 2. 일반 매치 카드 처리 (두 팀 대결)
  // 시드(순위) 숫자가 낮은 팀이 위로 오도록 정렬 (예: 4위 vs 5위 -> 4위가 위)
  const sortedTeams: MatchTeamInfo[] = [...teams].sort((a, b) => a.seed - b.seed);
  const topTeam = sortedTeams[0];
  const bottomTeam = sortedTeams[1];

  return (
    <View style={styles.nodeContainer}>
      <View style={[styles.titleBadge, { backgroundColor: '#007AFF' }]}>
        <Text style={styles.titleBadgeText}>{title}</Text>
      </View>

      <View style={styles.nodeCard}>
        <View style={styles.matchUpsContainer}>
          {/* 상위 시드 팀 (위) */}
          <TeamRow team={topTeam} />
          {/* VS 구분선 */}
          <View style={styles.vsDivider}>
            <Text style={styles.vsText}>VS</Text>
          </View>
          {/* 하위 시드 팀 (아래) */}
          <TeamRow team={bottomTeam} />
        </View>

        {/* 경기 스코어 리스트 */}
        {scores.length > 0 && (
          <View style={styles.scoreList}>
            {scores.map((s: string, i: number) => (
              <Text key={i} style={[styles.scoreItem, s.includes(':') && styles.highlightScore]}>
                <Text style={styles.roundText}>{i + 1}차전: </Text>{s}
              </Text>
            ))}
          </View>
        )}
      </View>
    </View>
  );
};

const PostSeasonStandings = () => {
  return (
    <ScrollView horizontal contentContainerStyle={styles.scrollContainer} showsHorizontalScrollIndicator={false}>
      <View style={styles.roadmapContainer}>
        
        {/* 데이터 구조 변경: teams 배열에 두 팀의 정보를 넣습니다.
          seed: 낮은 숫자가 상위 순위이며, 카드 상단에 배치됩니다.
          isWinner: true면 정상 표시, false면 회색 취소선 표시됩니다.
        */}

        {/* 1. 와일드카드 (예: NC 4위 vs 두산 5위) */}
        <View style={[styles.column, { paddingTop: 240 }]}>
          <BracketNode 
            title="와일드카드 (2전승제)" 
            teams={[
              { name: 'NC', seed: 4, isWinner: true },
              { name: '두산', seed: 5, isWinner: false }
            ]}
            scores={['4 : 1', '3 : 3 (NC승)']} 
          />
        </View>

        {/* 2. 준플레이오프 (예: 삼성 3위 vs NC WC승자) */}
        <View style={[styles.column, { paddingTop: 180 }]}>
          <BracketNode 
            title="준플레이오프 (5전3선승)" 
            teams={[
              { name: '삼성', seed: 3, isWinner: true },
              { name: 'NC', seed: 4, isWinner: false }
            ]}
            scores={['5 : 2', '3 : 4', '5 : 3', '5 : 2']} 
          />
        </View>

        {/* 3. 플레이오프 (예: SSG 2위 vs 삼성 준PO승자) */}
        <View style={[styles.column, { paddingTop: 120 }]}>
          <BracketNode 
            title="플레이오프 (5전3선승)" 
            teams={[
              { name: 'SSG', seed: 2, isWinner: true },
              { name: '삼성', seed: 3, isWinner: false }
            ]}
            scores={['8 : 9', '7 : 3', '4 : 5', '7 : 4', '11 : 2']} 
          />
        </View>

        {/* 4. 한국시리즈 (예: LG 1위 vs SSG PO승자) */}
        {/* *시나리오 수정: LG가 최종 우승이므로 여기서는 SSG가 이기고 LG랑 붙는걸로 표현* */}
        <View style={[styles.column, { paddingTop: 60 }]}>
          <BracketNode 
            title="한국시리즈 (7전4선승)" 
            teams={[
              { name: 'LG', seed: 1, isWinner: true },
              { name: 'SSG', seed: 2, isWinner: false }
            ]}
            scores={['2 : 8', '5 : 13', '7 : 3', '4 : 7', '4 : 1']} 
          />
        </View>
        
        {/* 5. 최종 챔피언 (기존 유지) */}
        <View style={[styles.column, { paddingTop: 0 }]}>
          <BracketNode 
            title="CHAMPION" 
            teams={[{ name: 'LG', seed: 1, isWinner: true }]} // 챔피언은 한 팀만 배열에 넣음
            scores={[]} 
            isChampion={true} 
          />
        </View>

      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: { paddingHorizontal: 30, paddingVertical: 50 },
  roadmapContainer: { flexDirection: 'row', alignItems: 'flex-start' },
  column: { width: 170, alignItems: 'center' }, // 두 팀 표시를 위해 너비 약간 확대
  
  nodeContainer: { alignItems: 'center', position: 'relative' },
  titleBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12, marginBottom: -8, zIndex: 10 },
  titleBadgeText: { color: '#fff', fontSize: 10, fontWeight: 'bold' },
  
  nodeCard: {
    backgroundColor: '#fff', borderRadius: 16, padding: 15, width: 155,
    alignItems: 'center', borderWidth: 1, borderColor: '#e2e8f0',
    elevation: 3, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4,
  },
  
  // 매치업 스타일 (두 팀 표시 영역)
  matchUpsContainer: { width: '100%', marginBottom: 10 },
  teamRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 4 },
  logoWrapper: { width: 30, alignItems: 'center', marginRight: 8 },
  teamNameBase: { fontSize: 14, fontWeight: 'bold' },
  winnerText: { color: '#1a202c' },
  // 패배 팀 스타일: 회색 + 취소선
  loserText: { color: '#A0AEC0', textDecorationLine: 'line-through' },
  loserLabel: { fontSize: 10, color: '#A0AEC0' },
  
  vsDivider: { alignItems: 'center', marginVertical: 2 },
  vsText: { fontSize: 8, color: '#cbd5e0', fontWeight: 'bold' },

  // 스코어 리스트 스타일
  scoreList: { width: '100%', borderTopWidth: 1, borderTopColor: '#f0f0f0', paddingTop: 8 },
  scoreItem: { fontSize: 11, color: '#718096', textAlign: 'center', marginBottom: 2 },
  roundText: { fontWeight: 'bold', color: '#aaa' },
  highlightScore: { color: '#e74c3c', fontWeight: 'bold' },

  // 챔피언 전용 스타일
  winnerCard: { borderColor: '#e74c3c', borderWidth: 2, backgroundColor: '#fff5f5' },
  teamHeader: { alignItems: 'center', marginBottom: 0 },
  teamNameText: { fontSize: 18, fontWeight: 'bold', marginTop: 8 },
  championText: { color: '#e74c3c' },
  championDeco: { alignItems: 'center', marginBottom: 5 },
  championYear: { fontSize: 10, fontWeight: 'bold', color: '#e74c3c' }
});

export default PostSeasonStandings;