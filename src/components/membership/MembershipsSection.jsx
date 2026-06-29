import RevealAnimation from '../animation/RevealAnimation';

const MembershipsSection = ({ membershipsData }) => {
  if (!membershipsData) return null;
  const _ = membershipsData;
  console.log(JSON.stringify(membershipsData, null, 2));
  return (
    <section className="rates-section py-[10rem] bg-background-2" id="rates">
      <div className="main-container">
        <RevealAnimation delay={0.1}>
          <div className="table-wrapper">
            <div className="table-preface pb-5 lg:max-w-[60%]">
              <h3 className="font-serif text-[3rem] pb-[.7rem]">{_.membershipsHeading}</h3>
              {_.membershipsDescription.length > 0 && <p className="whitespace-pre-line">{_.membershipsDescription}</p>}
            </div>
            <table className="table-auto table-striped table-striped-3">
              <thead>
                <tr>
                  <th scope="col"></th>
                  <th scope="col">
                    {' '}
                    <div className="th-wrap">Monthly</div>
                  </th>
                  <th scope="col">
                    <div className="th-wrap">Yearly</div>
                    <div className="note">15% off</div>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">
                    <div className="th-wrap">{_.juniorTitle}</div>
                    {_.juniorTitleDef?.length > 0 && <div className="note">{_.juniorTitleDef}</div>}
                  </th>
                   <td>{_.juniorMonthly}</td>
                  <td>{_.juniorYearly}</td>
                </tr>
                <tr>
                  <th scope="row">
                    <div className="th-wrap">{_.individualTitle}</div>
                       {_.individualTitleDef?.length > 0 && <div className="note">{_.individualTitleDef}</div>}
                  </th>
                  <td>{_.individualMonthly}</td>
                  <td>{_.individualYearly}</td>
                </tr>
                <tr>
                  <th scope="row">
                    <div className="th-wrap">{_.premiumIndividualTitle}</div>
                  </th>
                    <td>{_.premiumIndividualMonthly}</td>
                  <td>{_.premiumIndividualYearly}</td>
                </tr>
                <tr>
                  <th scope="row">
                    <div className="th-wrap">{_.seniorTitle}</div>
                    {_.seniorTitleDef?.length > 0 && <div className="note">{_.seniorTitleDef}</div>}
                  </th>
                  <td>{_.seniorMonthly}</td>
                  <td>{_.seniorYearly}</td>
                </tr>
                <tr>
                  <th scope="row">
                    <div className="th-wrap">{_.premiumSeniorTitle}</div>
                   {_.premiumSeniorTitleDef?.length > 0 && <div className="note">{_.premiumSeniorTitleDef}</div>}
                  </th>
                  <td>{_.premiumSeniorMonthly}</td>
                  <td>{_.premiumSeniorYearly}</td>
                </tr>
                <tr>
                  <th scope="row">
                    <div className="th-wrap">{_.familyTitle}</div>
                    {_.familyTitleDef?.length > 0 && <div className="note">{_.familyTitleDef}</div>}
                  </th>
                  <td>{_.familyMonthly}</td>
                  <td>{_.familyYearly}</td>
                </tr>
                <tr>
                  <th scope="row">
                    <div className="th-wrap">{_.premiumFamilyTitle}</div>
                    {_.premiumFamilyTitleDef?.length > 0 && <div className="note">{_.premiumFamilyTitleDef}</div>}
                  </th>
                  <td>{_.premiumFamilyMonthly}</td>
                  <td>{_.premiumFamilyYearly}</td>
                </tr>
                 <tr>
                  <th scope="row">
                    <div className="th-wrap">{_.corporateTitle}</div>
                    {_.corporateTitleDef?.length > 0 && <div className="note">{_.corporateTitleDef}</div>}
                  </th>
                  <td>{_.corporateMonthly}</td>
                  <td>{_.corporateYearly}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </RevealAnimation>
      </div>
    </section>
  );
};

export default MembershipsSection;
