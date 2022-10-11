export const editableTableColumns = [
  {
    title: "אותיות הרשימה",
    dataIndex: "letters",
    key: "letters",
    minWidth: 80,
  },
  {
    title: "מספר הקולות",
    dataIndex: "amount",
    key: "amount",
    render: (value) => value.toLocaleString(),
    minWidth: 100,
    editable: true,
  },
  {
    title: "עודפים",
    dataIndex: "odafim",
    key: "odafim",
    minWidth: 120,
    editable: true,
  },
];

export const columns = [
  {
    title: "אותיות הרשימה",
    dataIndex: "letters",
    key: "letters",
    fixed: "left",
    width: 10,
  },
  {
    title: "שם הרשימה",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "אחוז",
    key: "totalPercent",
    render: (record) => {
      const recFixed = (100 * record.totalPercent).toFixed(2);
      const originRecFixed = (100 * record.origin.totalPercent).toFixed(2);
      if (recFixed === originRecFixed) return `${recFixed}%`;
      let dis = (recFixed - originRecFixed).toFixed(2);

      return (
        <>
          <span>{`${recFixed}%`}</span>
          <span
            style={{ color: `${dis > 0 ? "green" : "red"}` }}
          >{` (${Math.abs(dis).toLocaleString()}%${
            dis > 0 ? "+" : "-"
          })`}</span>
        </>
      );
    },
    width: 15,
  },
  {
    title: "קולות",
    key: "amount",
    render: (record) => {
      if (record.amount === record.origin.amount)
        return record.amount.toLocaleString();
      let dis = record.amount - record.origin.amount;

      return (
        <>
          <span>{record.amount.toLocaleString()}</span>
          <span
            style={{ color: `${dis > 0 ? "green" : "red"}` }}
          >{` (${Math.abs(dis).toLocaleString()}${dis > 0 ? "+" : "-"})`}</span>
        </>
      );
    },
    width: 25,
  },
  {
    title: "הסכם עודפים",
    key: "odafim",
    render: (record) => {
      if (record.odafim === record.origin.odafim) return record.odafim;

      return (
        <>
          <span style={{ color: "green" }}>{record.odafim}</span>{" "}
          {record.origin.odafim && (
            <span
              style={{ color: "red", textDecoration: "line-through" }}
            >{`(${record.origin.odafim})`}</span>
          )}
        </>
      );
    },
    width: 10,
  },

  {
    title: "תוצאות ללא הסכמי עודפים",
    key: "totalWithOut",
    onCell: (record) => {
      let color;
      if (record.total !== record.totalWithOut) {
        color =
          record.total > record.totalWithOut ? "mediumspringgreen" : "tomato";
      }
      return { style: { background: color } };
    },
    render: (record) => {
      if (record.totalWithOut === record.origin.totalWithOut)
        return record.totalWithOut;
      let dis = record.totalWithOut - record.origin.totalWithOut;

      return (
        <>
          <span>{record.totalWithOut}</span>
          <span
            style={{ color: `${dis > 0 ? "green" : "red"}` }}
          >{` (${Math.abs(dis).toLocaleString()}${dis > 0 ? "+" : "-"})`}</span>
        </>
      );
    },
    width: 15,
  },
  {
    title: "לפני בדר עופר",
    key: "beforeBadderOfer",
    onCell: (record) => {
      let color;
      if (record.total !== record.beforeBadderOfer) {
        color =
          record.total > record.beforeBadderOfer
            ? "mediumspringgreen"
            : "tomato";
      }
      return { style: { background: color } };
    },
    render: (record) => {
      if (record.beforeBadderOfer === record.origin.beforeBadderOfer)
        return record.beforeBadderOfer;
      let dis = record.beforeBadderOfer - record.origin.beforeBadderOfer;

      return (
        <>
          <span>{record.beforeBadderOfer}</span>
          <span
            style={{ color: `${dis > 0 ? "green" : "red"}` }}
          >{` (${Math.abs(dis).toLocaleString()}${dis > 0 ? "+" : "-"})`}</span>
        </>
      );
    },
    width: 15,
  },
  {
    title: "מנדטים",
    key: "total",
    fixed: "right",
    render: (record) => {
      if (record.total === record.origin.total) return record.total;
      let dis = record.total - record.origin.total;

      return (
        <>
          <span>{record.total}</span>
          <span
            style={{ color: `${dis > 0 ? "green" : "red"}` }}
          >{` (${Math.abs(dis).toLocaleString()}${dis > 0 ? "+" : "-"})`}</span>
        </>
      );
    },
    width: 15,
  },
];
