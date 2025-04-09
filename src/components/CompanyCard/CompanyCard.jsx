import React from "react";
import { Card, CompanyName } from "./CompanyCard.styled";
import { formatDate, timeDifference } from "../../services";

const CompanyCard = ({
  company: { _id, companyName, edrpo, licenseStartTime, licenseEndTime },
}) => {
  const formatedStartDate = formatDate(licenseStartTime);
  const formatedEndDate = formatDate(licenseEndTime);
  const remainingTime = timeDifference(licenseStartTime, licenseEndTime);
  return (
    <div>
      <Card>
        <CompanyName>{companyName}</CompanyName>
        <p>ЄДПРОУ {edrpo}</p>
        <p>Дата початку ліцензії: {formatedStartDate}</p>
        <p>Дата закінчення ліцензії: {formatedEndDate}</p>
        <p>Час до закінчення ліцензії: {remainingTime}</p>
      </Card>
    </div>
  );
};

export default CompanyCard;
