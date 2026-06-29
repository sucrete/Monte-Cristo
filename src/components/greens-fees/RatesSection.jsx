import RevealAnimation from '../animation/RevealAnimation';

const RatesSection = ({ ratesSectionData }) => {
  const { weekday, weekend, twilight, nonStandard } = ratesSectionData ?? {};
  if (!weekday && !weekend && !twilight && !nonStandard) return null;
  console.log(`%c${JSON.stringify(ratesSectionData, null, 2)}`, 'color: green');

  return (
    <section className="rates-section py-[12rem] bg-background-2" id="rates">
      <div className="main-container">
        {weekday && <RevealAnimation delay={0.1}>
          <div className="table-wrapper">
            <div className="table-preface pb-5">
              <h3 className=" lg:max-w-1/2 text-[3rem] pb-[.7rem]">{weekday.ratesHeading}</h3>
              {weekday.ratesDescription?.length > 0 && <p className="lg:max-w-1/2">{weekday.ratesDescription} </p>}
            </div>
            <table className="table-auto table-striped table-striped-3">
              <thead>
                <tr>
                  <th scope="col"></th>
                  <th scope="col">
                    <div className="th-wrap"> 9 Holes</div>
                  </th>
                  <th scope="col">
                    <div className="th-wrap"> 18 Holes</div>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">
                    <div className="th-wrap">{weekday.walkTitle}</div>
                    {weekday.walkTitleDef?.length > 0 && <div className="note">{weekday.walkTitleDef}</div>}
                  </th>
                  <td>
                    <div>{weekday.walk9}</div>
                  </td>
                  <td>
                    <div>{weekday.walk18}</div>
                  </td>
                </tr>
                <tr>
                  <th scope="row">
                    <div className="th-wrap">{weekday.rideTitle}</div>
                    {weekday.rideTitleDef?.length > 0 && <div className="note">{weekday.rideTitleDef}</div>}
                  </th>
                  <td>
                    <div>{weekday.ride9}</div>
                  </td>
                  <td>
                    <div>{weekday.ride18}</div>
                  </td>
                </tr>
                <tr>
                  <th scope="row">
                    <div className="th-wrap">{weekday.jrTitle}</div>
                    {weekday.jrTitleDef?.length > 0 && <div className="note">{weekday.jrTitleDef}</div>}
                  </th>
                  <td>
                    <div>{weekday.jr9}</div>
                  </td>
                  <td>
                    <div>{weekday.jr18}</div>
                  </td>
                </tr>
                <tr>
                  <th scope="row">
                    <div className="th-wrap">{weekday.cartTitle}</div>
                    {weekday.cartTitleDef?.length > 0 && <div className="note">{weekday.cartTitleDef}</div>}
                  </th>
                  <td>
                    <div>{weekday.cart9}</div>
                  </td>
                  <td>
                    <div>{weekday.cart18}</div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </RevealAnimation>}
        {weekend && <RevealAnimation delay={0.1}>
          <div className="table-wrapper pt-[7rem]">
            <hr className="mb-[2rem]" />
            <div className="table-preface pb-5">
              <h3 className=" lg:max-w-1/2 text-[3rem] pb-[.7rem]">{weekend.ratesHeading}</h3>
              {weekend.ratesDescription?.length > 0 && <p className="lg:max-w-1/2">{weekend.ratesDescription} </p>}
            </div>
            <table className="table-auto table-striped table-striped-3">
              <thead>
                <tr>
                  <th scope="col"></th>
                  <th scope="col">
                    <div className="th-wrap"> 9 Holes</div>
                  </th>
                  <th scope="col">
                    <div className="th-wrap"> 18 Holes</div>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">
                    <div className="th-wrap">{weekend.walkTitle}</div>
                    {weekend.walkTitleDef?.length > 0 && <div className="note">{weekend.walkTitleDef}</div>}
                  </th>
                  <td>
                    <div>{weekend.walk9}</div>
                  </td>
                  <td>
                    <div>{weekend.walk18}</div>
                  </td>
                </tr>
                <tr>
                  <th scope="row">
                    <div className="th-wrap">{weekend.rideTitle}</div>
                    {weekend.rideTitleDef?.length > 0 && <div className="note">{weekend.rideTitleDef}</div>}
                  </th>
                  <td>
                    <div>{weekend.ride9}</div>
                  </td>
                  <td>
                    <div>{weekend.ride18}</div>
                  </td>
                </tr>
                <tr>
                  <th scope="row">
                    <div className="th-wrap">{weekend.jrTitle}</div>
                    {weekend.jrTitleDef?.length > 0 && <div className="note">{weekend.jrTitleDef}</div>}
                  </th>
                  <td>
                    <div>{weekend.jr9}</div>
                  </td>
                  <td>
                    <div>{weekend.jr18}</div>
                  </td>
                </tr>
                <tr>
                  <th scope="row">
                    <div className="th-wrap">{weekend.cartTitle}</div>
                    {weekend.cartTitleDef?.length > 0 && <div className="note">{weekend.cartTitleDef}</div>}
                  </th>
                  <td>
                    <div>{weekend.cart9}</div>
                  </td>
                  <td>
                    <div>{weekend.cart18}</div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </RevealAnimation>}

        {twilight && <RevealAnimation delay={0.1}>
          <div className="table-wrapper pt-[7rem]">
            <hr className="mb-[2rem]" />
            <div className="table-preface pb-5">
              <h3 className=" lg:max-w-1/2 text-[3rem] pb-[.7rem]">{twilight.ratesHeading}</h3>
              {twilight.ratesDescription?.length > 0 && <p className="lg:max-w-1/2">{twilight.ratesDescription} </p>}
            </div>
            <table className="table-auto table-striped table-striped-3">
              <thead>
                <tr>
                  <th scope="col"></th>
                  <th scope="col">
                    <div className="th-wrap">Price</div>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">
                    <div className="th-wrap">{twilight.walkTitle}</div>
                    {twilight.walkTitleDef?.length > 0 && <div className="note">{twilight.walkTitleDef}</div>}
                  </th>
                  <td>
                    <div>{twilight.walkPrice}</div>
                  </td>
                </tr>
                <tr>
                  <th scope="row">
                    <div className="th-wrap">{twilight.rideTitle}</div>
                    {twilight.rideTitleDef?.length > 0 && <div className="note">{twilight.rideTitleDef}</div>}
                  </th>
                  <td>
                    <div>{twilight.ridePrice}</div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </RevealAnimation>}
        {nonStandard && <RevealAnimation delay={0.1}>
          <div className="table-wrapper pt-[7rem]">
            <hr className="mb-[2rem]" />
            <div className="table-preface pb-5">
              <h3 className=" lg:max-w-1/2 text-[3rem] pb-[.7rem]">{nonStandard.ratesHeading}</h3>
              {nonStandard.ratesDescription?.length > 0 && (
                <p className="lg:max-w-1/2">{nonStandard.ratesDescription} </p>
              )}
            </div>
            <table className="table-auto table-striped table-striped-3">
              <thead>
                <tr>
                  <th scope="col"></th>
                  <th scope="col">
                    <div className="th-wrap">Price</div>{' '}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">
                    <div className="th-wrap">{nonStandard.ADMTitle}</div>
                    {nonStandard.ADMTitleDef?.length > 0 && <div className="note">{nonStandard.ADMTitleDef}</div>}
                  </th>
                  <td>
                    <div>{nonStandard.ADMPrice}</div>
                  </td>
                </tr>
                <tr>
                  <th scope="row">
                    <div className="th-wrap">{nonStandard.collegeStudentTitle}</div>
                    {nonStandard.collegeStudentTitleDef?.length > 0 && (
                      <div className="note">{nonStandard.collegeStudentTitleDef}</div>
                    )}
                  </th>
                  <td>
                    <div>{nonStandard.collegeStudentPrice}</div>
                  </td>
                </tr>
                <tr>
                  <th scope="row">
                    <div className="th-wrap">{nonStandard.adultHandicapTitle}</div>
                    {nonStandard.adultHandicapTitleDef?.length > 0 && (
                      <div className="note">{nonStandard.adultHandicapTitleDef}</div>
                    )}
                  </th>
                  <td>
                    <div>{nonStandard.adultHandicapPrice}</div>
                  </td>
                </tr>
                <tr>
                  <th scope="row">
                    <div className="th-wrap">{nonStandard.juniorHandicapTitle}</div>
                    {nonStandard.juniorHandicapTitleDef?.length > 0 && (
                      <div className="note">{nonStandard.juniorHandicapTitleDef}</div>
                    )}
                  </th>
                  <td>
                    <div>{nonStandard.juniorHandicapPrice}</div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </RevealAnimation>}
      </div>
    </section>
  );
};

export default RatesSection;
