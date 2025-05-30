import React, { useEffect } from 'react';

const ShowHop = (props) => {
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

  //천간합을 구하는 함수
  const figureSkyHop = () => {
    let skyHopArr = [];
    let i = 0;
    if (
      sky.indexOf('무') + 1 == sky.indexOf('계') ||
      sky.indexOf('무') - 1 == sky.indexOf('계')
    ) {
      skyHopArr[i] = '무계합화';
      i++;
    }

    if (
      sky.indexOf('갑') + 1 == sky.indexOf('기') ||
      sky.indexOf('갑') - 1 == sky.indexOf('기')
    ) {
      skyHopArr[i] = '갑기합토';
      i++;
    }

    if (
      sky.indexOf('정') + 1 == sky.indexOf('임') ||
      sky.indexOf('정') - 1 == sky.indexOf('임')
    ) {
      skyHopArr[i] = '정임합목';
      i++;
    }

    if (
      sky.indexOf('병') + 1 == sky.indexOf('신') ||
      sky.indexOf('병') - 1 == sky.indexOf('신')
    ) {
      skyHopArr[i] = '병신합수';
      i++;
    }

    if (
      sky.indexOf('을') + 1 == sky.indexOf('경') ||
      sky.indexOf('을') - 1 == sky.indexOf('경')
    ) {
      skyHopArr[i] = '을경합금';
      i++;
    }
    return skyHopArr;
  };

  //방합을 구하는 함수
  const figureBangHop = () => {
    let bangHopArr = [];
    let a = ground.indexOf('사');
    let b = ground.indexOf('오');
    let c = ground.indexOf('미');

    if (a != -1 && b != -1 && c != -1) {
      //월지를 하나 차지하고 있어야함.
      if (ground[2] == '사' || ground[2] == '오' || ground[2] == '미')
        bangHopArr.push('사오미 합화');
    }

    a = ground.indexOf('신');
    b = ground.indexOf('유');
    c = ground.indexOf('술');

    if (a != -1 && b != -1 && c != -1) {
      if (ground[2] == '신' || ground[2] == '유' || ground[2] == '술')
        bangHopArr.push('신유술 합금');
    }
    a = ground.indexOf('해');
    b = ground.indexOf('자');
    c = ground.indexOf('축');

    if (a != -1 && b != -1 && c != -1) {
      if (ground[2] == '해' || ground[2] == '자' || ground[2] == '축')
        bangHopArr.push('해자축 합수');
    }

    a = ground.indexOf('인');
    b = ground.indexOf('묘');
    c = ground.indexOf('진');

    if (a != -1 && b != -1 && c != -1) {
      if (ground[2] == '인' || ground[2] == '묘' || ground[2] == '진')
        bangHopArr.push('인묘진 합목');
    }
    return bangHopArr;
  };

  const figureSomHop = () => {
    const fireHop = ['인', '오', '술'];
    const goldHop = ['사', '유', '축'];
    const waterHop = ['신', '자', '진'];
    const treeHop = ['해', '묘', '미'];

    const sample1 = ground.slice(1, 4);
    const sample2 = ground.slice(2, 5);

    const checkFireHop1 = fireHop.filter((x) => sample1.includes(x));
    const checkFireHop2 = fireHop.filter((x) => sample2.includes(x));

    if (checkFireHop1.length == 3 || checkFireHop2.length == 3) {
      return '인오술 삼합';
    }

    const checkGoldHop1 = goldHop.filter((x) => sample1.includes(x));
    const checkGoldHop2 = goldHop.filter((x) => sample2.includes(x));

    if (checkGoldHop1.length == 3 || checkGoldHop2.length == 3) {
      return '사유축 삼합';
    }

    const checkWaterHop1 = waterHop.filter((x) => sample1.includes(x));
    const checkWaterHop2 = waterHop.filter((x) => sample2.includes(x));

    if (checkWaterHop1.length == 3 || checkWaterHop2.length == 3) {
      return '신자진 삼합';
    }

    const checkTreeHop1 = treeHop.filter((x) => sample1.includes(x));
    const checkTreeHop2 = treeHop.filter((x) => sample2.includes(x));

    if (checkTreeHop1.length == 3 || checkTreeHop2.length == 3) {
      return '해묘미 삼합';
    }

    return null;
  };

  const figureBanHop = () => {
    let banHopArr = [];
    //삼합이 한개라도 있으면 반합이 나올 수 없음.
    if (!figureSomHop()) {
      //화국 반합
      if (ground.includes('오')) {
        const fireLeft = ground.indexOf('오') - 1;
        const fireRight = ground.indexOf('오') + 1;

        if (ground[fireLeft] == '술' || ground[fireRight] == '술') {
          banHopArr.push('오술 반합');
        }
        if (ground[fireLeft] == '인' || ground[fireRight] == '인') {
          banHopArr.push('인오 반합');
        }
      }

      //금국 반합
      if (ground.includes('유')) {
        const goldLeft = ground.indexOf('유') - 1;
        const goldRight = ground.indexOf('유') + 1;

        if (ground[goldLeft] == '사' || ground[goldRight] == '사') {
          banHopArr.push('사유 반합');
        }
        if (ground[goldLeft] == '축' || ground[goldRight] == '축') {
          banHopArr.push('유축 반합');
        }
      }

      //수국 반합
      if (ground.includes('자')) {
        const waterLeft = ground.indexOf('자') - 1;
        const waterRight = ground.indexOf('자') + 1;

        if (ground[waterLeft] == '신' || ground[waterRight] == '신') {
          banHopArr.push('신자 반합');
        }
        if (ground[waterLeft] == '진' || ground[waterRight] == '진') {
          banHopArr.push('자진 반합');
        }
      }

      //목국 반합
      if (ground.includes('묘')) {
        const treeLeft = ground.indexOf('묘') - 1;
        const treeRight = ground.indexOf('묘') + 1;

        if (ground[treeLeft] == '해' || ground[treeRight] == '해') {
          banHopArr.push('해묘 반합');
        }
        if (ground[treeLeft] == '미' || ground[treeRight] == '미') {
          banHopArr.push('묘미 반합');
        }
      }
    }
    return banHopArr;
  };

  const figureSixHop = () => {
    let sixHopArr = [];

    const Za = ground.indexOf('자');
    if (ground[Za - 1] == '축' || ground[Za + 1] == '축') {
      sixHopArr.push('자축합');
    }

    const In = ground.indexOf('인');
    if (ground[In - 1] == '해' || ground[In + 1] == '해') {
      sixHopArr.push('인해합');
    }

    const Myo = ground.indexOf('묘');
    if (ground[Myo - 1] == '술' || ground[Myo + 1] == '술') {
      sixHopArr.push('묘술합');
    }

    const Jin = ground.indexOf('진');
    if (ground[Jin - 1] == '유' || ground[Jin + 1] == '유') {
      sixHopArr.push('진유합');
    }

    const Sa = ground.indexOf('사');
    if (ground[Sa - 1] == '신' || ground[Sa + 1] == '신') {
      sixHopArr.push('사신합');
    }

    const Ow = ground.indexOf('오');
    if (ground[Ow - 1] == '미' || ground[Ow + 1] == '미') {
      sixHopArr.push('오미합');
    }

    return sixHopArr;
  };

  useEffect(() => {
    const skyHop = figureSkyHop();
    const bangHop = figureBangHop();
    const somHop = figureSomHop();
    const banHop = figureBanHop();
    const sixHop = figureSixHop();

    if (props.onHopCalculated) {
      props.onHopCalculated({
        skyHop,
        bangHop,
        somHop,
        banHop,
        sixHop,
      });
    }
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

  return (
    <div>
      {figureSkyHop().map((hop, index) => (
        <div key={`sky-${index}`}>{hop}</div>
      ))}
      {figureBangHop().map((hop, index) => (
        <div key={`bang-${index}`}>{hop}</div>
      ))}
      {figureSomHop() && <div>{figureSomHop()}</div>}
      {figureBanHop().map((hop, index) => (
        <div key={`ban-${index}`}>{hop}</div>
      ))}
      {figureSixHop().map((hop, index) => (
        <div key={`six-${index}`}>{hop}</div>
      ))}
      {!figureSkyHop().length &&
        !figureBangHop().length &&
        !figureSomHop() &&
        !figureBanHop().length &&
        !figureSixHop().length && <div>합 없음</div>}
    </div>
  );
};

export default ShowHop;
