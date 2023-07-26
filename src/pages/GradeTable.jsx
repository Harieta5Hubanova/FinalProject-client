import React from 'react';
const GradeTable = () => {
  const gradeData = [
    {
      level: 'BEGINNERS',
      vScale: ['V0', 'V1', 'V2'],
      fontScale: ['4', '5', '5+'],
      description:
        'Large hand holds, plenty of foot holds, great for new climbers'
    },
    {
      level: 'INTERMEDIATE',
      vScale: ['V3', 'V4', 'V5', 'V6', 'V7'],
      fontScale: ['6a', '6a+', '6b', '6b+', '6c'],
      description:
        'Intermediate/moderate climbs characterized by smaller holds, more advanced movements, and more balance.'
    },
    {
      level: 'ADVANCED',
      vScale: ['V8', 'V9', 'V10', 'V11', 'V12', 'V13'],
      fontScale: ['6c+', '7a', '7a+', '7b', '7b+', '7c'],
      description:
        'Serious skill required! More technical movements, strength, and balance.'
    },
    {
      level: 'PRO',
      vScale: ['V14', 'V15', 'V16'],
      fontScale: ['8a', '8a+', '8b+'],
      description:
        "Bouldering isn't just a hobby, you're climbing or training for climbing almost every day."
    },
    {
      level: 'ELITE',
      vScale: ['V17'],
      fontScale: ['9a'],
      description: "The world's best and strongest climbers."
    }
  ];

  return (
    <div className="gradetable">
      <header>
        <table className="grade-table">
          <thead>
            <tr>
              <th colSpan="2" className="level-heading">
                <div className="logo-level-container">
                  <img
                    src="/public/images/Belay me.png"
                    alt="Belay me"
                    className="logo"
                  />
                </div>
              </th>
              <th className="table-heading">V-SCALE (Vermin/Hueco Scale)</th>
              <th className="table-heading">
                FONT-SCALE (Fontainebleau/French)
              </th>
            </tr>
          </thead>
          <tbody>
            {gradeData.map((grade, index) => (
              <React.Fragment key={index}>
                <tr>
                  <td colSpan="2">
                    <strong>{grade.level}</strong>
                    <br />
                    {grade.description}
                  </td>
                  <td>
                    {grade.vScale.map((v, i) => (
                      <div key={`v-${i}`}>{v}</div>
                    ))}
                  </td>
                  <td>
                    {grade.fontScale.map((fs, i) => (
                      <div key={`fs-${i}`}>{fs}</div>
                    ))}
                  </td>
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </header>
    </div>
  );
};
export default GradeTable;
