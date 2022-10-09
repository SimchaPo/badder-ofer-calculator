export const calculate = (localResults) => {
  // total good votes
  let a = localResults.reduce((a, b) => a + b.amount, 0);
  if (a <= 0) {
    localResults = localResults.map((lr) => {
      return { ...lr, total: 0, totalPercent: 0, beforeBadderOfer: 0 };
    });

    return localResults;
  }
  // console.log(a);
  // achuz hachsaima
  let b = (a * 3.25) / 100;
  // didnt pass
  let c = localResults
    .filter((res) => res.amount < b)
    .reduce(
      (previousValue, currentValue) => previousValue + currentValue.amount,
      0
    );
  // total pass
  let d = a - c;

  // moded klali
  let e = d / 120;

  let f = localResults.map((res) => res.amount);
  let g = f.map((fn) => (fn > b ? Math.floor(fn / e) : 0));

  localResults = localResults.map((lres) => {
    return {
      ...lres,
      g: lres.amount > b ? Math.floor(lres.amount / e) : 0,
      totalPercent: lres.amount / a || 0,
      beforeBadderOfer: lres.amount > b ? Math.floor(lres.amount / e) : 0,
    };
  });

  let h =
    120 -
    g.reduce((previousValue, currentValue) => previousValue + currentValue, 0);

  let odafimCal = localResults
    .filter((lr) => lr.amount >= b)
    .reduce((previousValue, currentValue) => {
      if (
        !previousValue.find((pv) => pv.letters.includes(currentValue.letters))
      ) {
        let letters = [currentValue.letters];
        let f = currentValue.amount;
        let g = currentValue.g;
        if (f >= b && currentValue.odafim) {
          let odafimElement = localResults.find(
            (lr) => lr.letters === currentValue.odafim
          );
          if (odafimElement.amount >= b) {
            letters.push(odafimElement.letters);
            f += odafimElement.amount;
            g += odafimElement.g;
          }
        }
        previousValue.push({
          letters,
          f,
          g,
          i: f / (g + 1),
        });
      }
      return previousValue;
    }, []);
  let highestIndex;
  let highestI;
  for (let index = 0; index < h; index++) {
    highestIndex = 0;
    highestI = 0;
    odafimCal.forEach((oc, i) => {
      if (oc.i >= highestI) {
        highestIndex = i;
        highestI = oc.i;
      }
    });

    ++odafimCal[highestIndex].g;
    odafimCal[highestIndex].i =
      odafimCal[highestIndex].f / (odafimCal[highestIndex].g + 1);
  }
  odafimCal
    .filter((oc) => oc.letters.length === 2)
    .forEach((oc) => {
      let lr1Index = localResults.find((lr) => lr.letters === oc.letters[0]);
      let lr2Index = localResults.find((lr) => lr.letters === oc.letters[1]);
      let lr1 = localResults.find((lr) => lr.letters === oc.letters[0]);
      let lr2 = localResults.find((lr) => lr.letters === oc.letters[1]);

      let modedA = oc.f / oc.g || 0;
      lr1.g = Math.floor(lr1.amount / modedA) || 0;
      lr2.g = Math.floor(lr2.amount / modedA) || 0;

      while (lr1.g + lr2.g < oc.g) {
        let moded1 = Math.floor(lr1.amount / (lr1.g + 1));
        let moded2 = Math.floor(lr2.amount / (lr2.g + 1));
        if (moded1 > moded2) ++lr1.g;
        else ++lr2.g;
      }

      localResults[lr1Index] = lr1;
      localResults[lr2Index] = lr2;
    });

  odafimCal
    .filter((oc) => oc.letters.length !== 2)
    .forEach((oc) => {
      let lr1Index = localResults.find((lr) => lr.letters === oc.letters[0]);
      let lr1 = localResults.find((lr) => lr.letters === oc.letters[0]);
      lr1.g = oc.g;
      localResults[lr1Index] = lr1;
    });

  localResults = localResults.map((lr) => {
    let total = lr.g;
    return { ...lr, total };
  });

  return localResults;
};
