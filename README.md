---
title: Mama Papa Teller
emoji: 🎙️
colorFrom: pink
colorTo: yellow
sdk: docker
app_file: app/main.py
pinned: false
---

# 🎙️ 마마파파텔러 (Mama Papa Teller)

> **부모의 목소리를 복제하여 감정 풍부하게 읽어주는 태블릿 기반 인터랙티브 구연동화 서비스**

마마파파텔러는 바쁜 맞벌이 부모의 육아 부담을 덜어주고, 기존 오디오북의 기계적인 단조로움을 해결하기 위해 탄생한 AI 구연동화 플랫폼입니다. 단순히 텍스트를 읽는 것을 넘어, **부모의 음색(Voice Cloning)**과 **동화 속 문맥에 맞는 감정(Emotion Analysis)**을 결합하여 아이에게 부모가 직접 읽어주는 듯한 깊은 정서적 교감과 몰입감을 선사합니다.

---

## 📌 Project Overview

### 배경 및 문제 정의
맞벌이 가구의 증가로 퇴근 후 지친 부모가 아이에게 매일 책을 읽어주기 어려운 현실입니다. 기존의 동화 앱이나 유튜브는 일방적인 시청각 자극만 제공하거나 기계적인 TTS 말투를 사용하여 아이가 금방 흥미를 잃고, 돌발적인 질문에 대처하지 못한다는 한계가 있습니다.

### 해결 솔루션
> **"단조로운 기계음과 일방적 전달 방식을 넘어, 부모의 다정한 목소리로 아이와 소통하는 양방향 동화 서비스"**

| 기존 동화 서비스의 한계 (Pain Point) | 마마파파텔러의 핵심 가치 (Solution) |
| :--- | :--- |
| 기계적이고 일정한 톤의 TTS로 인한 몰입도 저하 | **보이스 클로닝 및 감정 제어**로 부모 목소리에 생생한 감정 부여 |
| 일방적인 시청각 자극 제공으로 상호작용 불가 | **STT & LLM 기반 양방향 소통**으로 아이의 질문과 답변에 실시간 반응 |
| 문어체 중심의 딱딱한 동화 원문 텍스트 | 아이의 눈높이에 맞춘 **구어체 변환 및 발화 최적화 전처리** |

---

## ✨ Key Features

### 1. 부모님 목소리 복제 및 동적 감정 표현 (Emotional Voice Cloning)
- 단 1분의 음성 녹음만으로 부모의 고유한 음색과 개성을 정교하게 재현합니다.
- 동화의 전개 상황(기쁨, 슬픔, 긴장감 등)에 맞춰 TTS 엔진의 `Stability`, `Similarity`, `Style Exaggeration` 파라미터를 동적으로 제어하여 생동감 넘치는 구연동화를 제공합니다.

### 2. 문맥 이해 기반 NLP 파이프라인 (Context-Aware NLP)
- `pyMuPDF`를 활용해 동화 원문 데이터를 추출하고, 아이들이 이해하기 쉬운 다정한 구어체로 정규화 및 정제합니다.
- LLM이 동화의 전체 문맥을 분석하여 각 문장에 가장 적합한 감정 라벨과 발화 지시어를 추출합니다.

### 3. 아이와 소통하는 인터랙티브 대화 (Interactive Storytelling)
- 동화 중간에 AI가 아이에게 이야기에 관한 질문을 던지고, 아이의 대답을 유도합니다.
- 부정확할 수 있는 아이의 발음을 `Whisper STT`로 정확히 인식하고, `LLM`이 아이의 답변에 맞춰 자연스러운 리액션과 대화를 이어갑니다.

### 4. 아이 친화적 태블릿 전용 뷰어 (Kid-Friendly UI/UX)
- 태블릿 환경에 최적화된 동화책 뷰어를 제공하여 삽화 슬라이드와 텍스트를 한눈에 볼 수 있습니다.
- 아이가 직관적으로 조작할 수 있는 큼직한 마이크 버튼과 이야기의 감정 변화를 시각적으로 보여주는 인터페이스를 갖추고 있습니다.

---

## 🛠 Tech Stack

| 영역 | 사용 기술 | 핵심 역할 |
| :--- | :--- | :--- |
| **Frontend / UI** | `Streamlit`, `HTML5`, `CSS3` | 태블릿 전용 반응형 동화책 뷰어, 감정 시각화 및 오디오 컨트롤 인터페이스 |
| **Backend / API** | `FastAPI`, `Pydantic`, `SQLAlchemy` | STT-LLM-TTS 모듈 간 비동기 파이프라인 설계 및 실시간 스트리밍 API 관리 |
| **AI / NLP** | `OpenAI API`, `Llama 3`, `LangChain`, `Qwen3` | 동화 구어체 변환, 문맥 기반 감정 태그 추출, 인터랙티브 대화 시나리오 생성 |
| **Voice AI (STT/TTS)** | `OpenAI Whisper`, `ElevenLabs API` | 유아 발음 인식(STT), 부모 음성 클로닝 및 감정 파라미터 동적 제어(TTS) |
| **Data & Audio** | `Python`, `pyMuPDF (fitz)`, `PyAudio` | 동화 원문 텍스트 추출/정제, TTS 발화 최적화 및 표준 오디오 재생 인터페이스 |
| **Infra / DevOps** | `Docker`, `Docker-Compose`, `NVIDIA Docker` | 멀티 모듈 컨테이너화, 라이브러리 충돌 방지 및 통합 배포 환경 구축 |

---

## 🏗 System Architecture & Service Flow

### 시스템 파이프라인
```text
[동화 원문 (PDF/Text)] ──► [pyMuPDF 텍스트 추출 및 구어체 정제]
                                      │
                                      ▼
                       [LLM 문맥 분석 및 문장별 감정 태그 추출]
                                      │
[부모 음성 샘플 (1분)] ──► [ElevenLabs 보이스 클로닝 & 감정 파라미터 동적 조절]
                                      │
                                      ▼
                       [태블릿 뷰어 (동화 삽화 + 부모 목소리 구연)]
                                      │
[아이의 질문/답변 발화] ──► [Whisper STT 인식] ──► [LLM 맞춤형 대답 생성] ──► [실시간 음성 응답]
```

### 사용자 경험 흐름 (User Flow)
1. **도서 선택:** 태블릿 뷰어에서 아이의 연령과 취향에 맞는 맞춤형 동화를 선택합니다.
2. **목소리 설정:** 등록된 부모님의 목소리 모드를 활성화합니다.
3. **동화 감상:** 장면의 분위기에 따라 호랑이 목소리는 무섭게, 슬픈 장면은 차분하게 읽어주는 부모님 목소리에 몰입합니다.
4. **양방향 소통:** 이야기가 진행되며 던져지는 질문에 아이가 마이크를 통해 대답하고, 엄마/아빠 목소리로 피드백을 받습니다.
5. **독서 마무리:** 동화가 끝나면 오늘의 독서 기록이 자동으로 저장되며 편안하게 취침을 유도합니다.

---

## 🚀 Getting Started

### Prerequisites
- Python 3.10+
- Docker & Docker-Compose
- OpenAI API Key & ElevenLabs API Key

### Installation & Run

1. **저장소 클론 및 디렉토리 이동**
```bash
git clone https://github.com/Seong-Su187/mama_papa_tellar.git
cd mama_papa_tellar
```

2. **환경 변수 설정 (`.env` 파일 생성)**
```env
OPENAI_API_KEY=your_openai_api_key
ELEVENLABS_API_KEY=your_elevenlabs_api_key
```

3. **Docker-Compose를 이용한 통합 실행**
```bash
docker-compose up --build -d
```

4. **로컬 환경에서 직접 실행할 경우**
```bash
pip install -r requirements.txt
streamlit run app/main.py
```
