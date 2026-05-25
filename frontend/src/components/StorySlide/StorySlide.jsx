import React, { useState, useEffect, useRef } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  LabelList,
} from "recharts";
import APP_ACCESS_HANDSHAKE_KEY from "../../config/envConfig";
import "./StorySlide.css";

function StorySlide({ page }) {
  const videoRef = useRef(null);

  // --- 1. 미디어 관련 State ---
  const [isError, setIsError] = useState(false);
  const [displaySrc, setDisplaySrc] = useState("");
  const [isVideoReady, setIsVideoReady] = useState(false);

  // --- 2. 차트/API 관련 State 추가 ---
  const [chartData, setChartData] = useState([]);
  const [isApiConnected, setIsApiConnected] = useState(false);

  // 파일 주소 해결 함수
  const resolveMediaSrc = (src) => {
    if (!src) return "";
    if (/^(https?:|data:|blob:)/.test(src)) return src;
    if (src.startsWith("/")) return src;
    return `/${src}`;
  };

  // MP4 비디오 판별 함수
  const isVideoFile = (src) => {
    if (!src) return false;
    return (
      src.toLowerCase().endsWith(".mp4") || src.toLowerCase().includes(".mp4")
    );
  };

  const newSrc = resolveMediaSrc(page?.image);

  // --- 3. API 주소 연결 및 데이터 가공 (추가된 부분) ---
  useEffect(() => {
    // 예: page 객체 안에 apiUrl 데이터가 있을 때만 API를 호출한다고 가정
    // (만약 page.type === "chart" 같은 다른 조건이 있다면 그에 맞게 수정하세요)
    console.log("page.apiUrl : ", page?.apiUrl); // 원본 데이터 확인용 로그  
    if (page?.apiUrl) {
      const fetchChartData = async () => {
        try {
          // 1. API 호출
          console.log("page?.apiUrl + APP_ACCESS_HANDSHAKE_KEY(page?.apiUrl) : ", page?.apiUrl + APP_ACCESS_HANDSHAKE_KEY(page?.apiUrl)); // 원본 데이터 확인용 로그  
          const response = await fetch(page?.apiUrl + APP_ACCESS_HANDSHAKE_KEY(page?.apiUrl));
          const rawData = await response.json();

          // 2. 다양한 API 응답 데이터를 차트용 표준 포맷으로 가공 (Mapping)
          const colors = ["#ff7675", "#74b9ff", "#55efc4", "#fdcb6e", "#a29bfe", "#e17055"];
          console.log("원본 API 응답 데이터:", rawData); // 원본 데이터 확인용 로그
          // F12 개발자 도구에서 rawData 구조를 확인 가능해요

          const apiItems = rawData?.body?.items?.item || [];
          let formattedData = [];

          if (apiItems.length > 0) {
            const targetData = apiItems[0];

            if (page?.apiUrl == "https://safemap.go.kr/openapi2/IF_0064?returnType=JSON&pageNo=1&numOfRows=999999&serviceKey=") {
              let sumTot = 0;
              let sumInj = 0;
              let sumDeath = 0;

              apiItems.forEach((item) => {
                sumTot += item.tot || 0;
                sumDeath += item.death || 0;
                sumInj += item.injpsn || 0;
              });

              formattedData = [
                {
                  name: "전체 발생수",
                  value: Number(sumTot || 0),
                  color: colors[0]
                },
                {
                  name: "사망자수",
                  value: Number(sumDeath || 0),
                  color: colors[1]
                },
                {
                  name: "부상자수",
                  value: Number(sumInj || 0),
                  color: colors[2]
                }
              ];
            } else if (page?.apiUrl == "이름2") {
              // 다른 API의 경우 가공 로직을 여기에 추가
            }
          }
          console.log("차트용으로 가공된 데이터:", formattedData); // 가공된 데이터 확인용 로그

          // 3. State 업데이트
          setChartData(formattedData);
          setIsApiConnected(true);
        } catch (error) {
          console.error("차트 데이터 API 호출 실패:", error);
          setIsApiConnected(false);
          setChartData([]); // 에러 시 데이터 초기화
        }
      };

      fetchChartData();
    } else {
      // API 호출 조건이 아니면 차트 화면 비활성화
      setIsApiConnected(false);
      setChartData([]);
    }
  }, [page?.apiUrl]); // apiUrl이 변경될 때마다 실행

  // --- 4. 새 미디어 로드 완료 후 교체 ---
  useEffect(() => {
    setIsError(false);
    setIsVideoReady(false);

    if (!newSrc) {
      setDisplaySrc("");
      return;
    }

    if (isVideoFile(newSrc)) {
      setDisplaySrc(newSrc);
    } else {
      const img = new Image();
      img.src = newSrc;

      img.onload = () => {
        setDisplaySrc(newSrc);
      };

      img.onerror = () => {
        setDisplaySrc(newSrc);
        setIsError(true);
      };
    }
  }, [newSrc]);

  const isVideo = isVideoFile(displaySrc);

  if (!page) {
    return <div className="illustration-card">데이터를 기다리는 중...</div>;
  }

  return (
    <>
      <div
        className="illustration-card"
        style={{ position: "relative", overflow: "hidden" }}
      >
        {/* 1. API 연결 상태 (차트 렌더링) */}
        {isApiConnected && chartData.length > 0 ? (
          <section
            className="example-chart-section"
            style={{
              width: "100%",
              height: "100%",
              background: "rgba(255,255,255,0.8)",
              borderRadius: "16px",
            }}
          >
            <div style={{ width: "100%", height: "360px" }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={chartData}
                  margin={{ top: 50, right: 20, left: 20, bottom: 50 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" stroke="#555" tickLine={false} />
                  <YAxis type="number" hide />
                  <Tooltip cursor={{ fill: "rgba(0, 0, 0, 0.05)" }} />
                  <Bar dataKey="value" radius={[10, 10, 0, 0]} barSize={35}>
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                    <LabelList
                      dataKey="value"
                      position="top"
                      formatter={(val) => val.toLocaleString()} // 3자리마다 쉼표(,) 포맷팅
                      style={{ fill: "#333", fontSize: "14px", fontWeight: "bold" }}
                    />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </section>
        ) : /* 2. API가 아니고, 미디어 소스(displaySrc)가 있을 때 */
          displaySrc ? (
            isVideo ? (
              /* 2-1. 비디오 렌더링 */
              <video
                ref={videoRef}
                key={displaySrc}
                className="illustration-image"
                src={displaySrc}
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                controls={false}
                disablePictureInPicture
                controlsList="nodownload nofullscreen noplaybackrate"
                onLoadedData={() => {
                  videoRef.current
                    ?.play()
                    .then(() => setIsVideoReady(true))
                    .catch(() => setIsVideoReady(true));
                }}
                onPlaying={() => setIsVideoReady(true)}
                onError={() => setIsError(true)}
                style={{
                  objectFit: "cover",
                  width: "100%",
                  height: "100%",
                  display: "block",
                  opacity: isVideoReady ? 1 : 0,
                }}
              />
            ) : (
              /* 2-2. 이미지 렌더링 */
              <img
                className="illustration-image"
                src={displaySrc}
                alt="동화 이미지"
                onError={() => setIsError(true)}
              />
            )
          ) : (
            /* 3. API도 없고, 미디어 소스도 없을 때 (예외 처리) */
            <div className="image-empty-box">
              이미지나 영상, 또는 API 데이터가 없습니다.
            </div>
          )}

        {/* 에러 발생 시 보여줄 오버레이 화면 */}
        {isError && (
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "#fff0f0",
              color: "#d32f2f",
              padding: "20px",
              fontSize: "14px",
              wordBreak: "break-all",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              border: "2px solid red",
              zIndex: 10,
            }}
          >
            <p style={{ fontWeight: "bold", marginBottom: "10px" }}>
              미디어(이미지/영상) 로드 실패
            </p>
            <p>
              <strong>넘어온 주소:</strong>{" "}
              {page.image || "값이 없음(null/undefined)"}
            </p>
            <p>
              <strong>실제 적용 주소:</strong>{" "}
              {displaySrc || "값이 없음(null/undefined)"}
            </p>
            <p style={{ marginTop: "10px", fontSize: "12px", color: "#666" }}>
              frontend/public 안에 넣었다면 주소는 /illusts/ST_002/scene_1.mp4 혹은
              .png 형태여야 합니다.
            </p>
          </div>
        )}
      </div >

      {/* 스토리 텍스트 영역 */}
      < div className="story-text-card" >
        <p>{page.text}</p>
      </div >
    </>
  );
}

export default StorySlide;