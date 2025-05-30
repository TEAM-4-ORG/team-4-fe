import React, { useEffect } from 'react';

const ShowChung = (props) => {
  const sky = [
    null, //-1이랑 0이랑 자꾸 나란히 하게되서..
    props.yearSky.name,
    props.monthSky.name,
    props.daySky.name,
    props.timeSky.name,
  ];

  const ground = [
    null,
    props.yearGround.name,
    props.monthGround.name,
    props.dayGround.name,
    props.timeGround.name,
  ];

  const calculateChung = () => {
    const skyChung = figureSkyChung();
    const groundChung = figureGroundChung();

    if (props.onChungCalculated) {
      props.onChungCalculated({
        skyChung: skyChung || [],
        groundChung: groundChung || [],
      });
    }
  };

  useEffect(() => {
    calculateChung();
  }, [
    props.yearSky,
    props.yearGround,
    props.monthSky,
    props.monthGround,
    props.daySky,
    props.dayGround,
    props.timeSky,
    props.timeGround,
  ]);

  const figureSkyChung = () => {
    let skyChungArr = [];
    if (
      sky.indexOf('갑') + 1 == sky.indexOf('경') ||
      sky.indexOf('갑') - 1 == sky.indexOf('경')
    ) {
      skyChungArr.push('갑경충');
    }

    if (
      sky.indexOf('을') + 1 == sky.indexOf('신') ||
      sky.indexOf('을') - 1 == sky.indexOf('신')
    ) {
      skyChungArr.push('을신충');
    }

    if (
      sky.indexOf('병') + 1 == sky.indexOf('임') ||
      sky.indexOf('병') - 1 == sky.indexOf('임')
    ) {
      skyChungArr.push('병임충');
    }

    if (
      sky.indexOf('정') + 1 == sky.indexOf('계') ||
      sky.indexOf('정') - 1 == sky.indexOf('계')
    ) {
      skyChungArr.push('정계충');
    }
    return skyChungArr;
  };

  const figureGroundChung = () => {
    let groundChungArr = [];

    if (
      ground.indexOf('인') + 1 == ground.indexOf('신') ||
      ground.indexOf('인') - 1 == ground.indexOf('신')
    ) {
      groundChungArr.push('인신충');
    }

    if (
      ground.indexOf('사') + 1 == ground.indexOf('해') ||
      ground.indexOf('사') - 1 == ground.indexOf('해')
    ) {
      groundChungArr.push('사해충');
    }

    if (
      ground.indexOf('자') + 1 == ground.indexOf('오') ||
      ground.indexOf('자') - 1 == ground.indexOf('오')
    ) {
      groundChungArr.push('자오충');
    }

    if (
      ground.indexOf('묘') + 1 == ground.indexOf('유') ||
      ground.indexOf('묘') - 1 == ground.indexOf('유')
    ) {
      groundChungArr.push('묘유충');
    }

    if (
      ground.indexOf('진') + 1 == ground.indexOf('술') ||
      ground.indexOf('진') - 1 == ground.indexOf('술')
    ) {
      groundChungArr.push('진술충');
    }

    if (
      ground.indexOf('축') + 1 == ground.indexOf('미') ||
      ground.indexOf('축') - 1 == ground.indexOf('미')
    ) {
      groundChungArr.push('축미충');
    }

    return groundChungArr;
  };

  const figureSomHyung = () => {
    const inSaSin = ['인', '사', '신'];
    const chuckSulMe = ['축', '술', '미'];

    const sample1 = ground.slice(1, 4);
    const sample2 = ground.slice(2, 5);

    const checkInSaSin1 = inSaSin.filter((x) => sample1.includes(x));
    const checkInSaSin2 = inSaSin.filter((x) => sample2.includes(x));

    if (checkInSaSin1.length == 3 || checkInSaSin2.length == 3) {
      return '인사신 삼형';
    }

    const checkChuckSulMe1 = chuckSulMe.filter((x) => sample1.includes(x));
    const checkChuckSulMe2 = chuckSulMe.filter((x) => sample2.includes(x));

    if (checkChuckSulMe1.length === 3 || checkChuckSulMe2.length === 3) {
      return '축술미 삼형';
    }

    return null;
  };

  const figureHyung = () => {
    let hyungArr = [];

    if (!figureSomHyung()) {
      //삼형이 하나라도 있으면 다른 형은 나올 수 없음

      //자묘형 찾기
      if (ground.includes('자')) {
        const zaLeft = ground.indexOf('자') - 1;
        const zaRight = ground.indexOf('자') + 1;

        if (ground[zaLeft] == '묘' || ground[zaRight] == '묘') {
          hyungArr.push('자묘형');
        }
      }

      if (ground.includes('사')) {
        const saLeft = ground.indexOf('사') - 1;
        const saRight = ground.indexOf('사') + 1;

        if (ground[saLeft] == '인' || ground[saRight] == '인') {
          hyungArr.push('인사형');
        }

        if (ground[saLeft] == '신' || ground[saRight] == '신') {
          hyungArr.push('사신형');
        }
      }

      if (ground.includes('술')) {
        const sulLeft = ground.indexOf('술') - 1;
        const sulRight = ground.indexOf('술') + 1;

        if (ground[sulLeft] == '축' || ground[sulRight] == '축') {
          hyungArr.push('축술형');
        }
      }
    }
    return hyungArr;
  };

  return (
    <div>
      {figureSkyChung().map((chung, index) => (
        <div key={`sky-${index}`}>{chung}</div>
      ))}
      {figureGroundChung().map((chung, index) => (
        <div key={`ground-${index}`}>{chung}</div>
      ))}
      {figureSomHyung() && <div>{figureSomHyung()}</div>}
      {figureHyung().map((hyung, index) => (
        <div key={`hyung-${index}`}>{hyung}</div>
      ))}
      {!figureSkyChung().length &&
        !figureGroundChung().length &&
        !figureSomHyung() &&
        !figureHyung().length && <div>충 없음</div>}
    </div>
  );
};

export default ShowChung;
