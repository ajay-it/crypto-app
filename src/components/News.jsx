import React from "react";
import { Select, Typography, Avatar, Card, Row, Col } from "antd";
import { useGetCryptoNewsQuery } from "../services/cryptoNewsApi";

const { Text, Title } = Typography;
const { Option } = Select;

export default function News({ simplified }) {
  const { data, isFetching } = useGetCryptoNewsQuery({
    newsCategory: "Cryptocurrency",
    count: simplified ? 10 : 100,
  });
  console.log("🚀 ~ News ~ count:", data);

  return <div>News</div>;
}
