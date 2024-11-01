import React from "react";
import * as TalkRn from "@talkjs/expo";
import { StyleSheet, Text, View, ImageBackground } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { gql, useQuery } from "@apollo/client";
const FECTH_USER_BYID = gql`
  query ExampleQuery($userId: ID!) {
    user(id: $userId) {
      fullname
      email
    }
  }
`;

const FECTH_STAFF_BYID = gql`
  query ExampleQuery($staffId: ID!) {
    staff(id: $staffId) {
      id
      fullname
      email
      phoneNumber
      address
      specialist
    }
  }
`;

function Chat({ route }) {
  if (!route.params) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>you don't have conversation</Text>
      </View>
    );
  }
  const userId = route.params.userId;
  const staffId = route.params.staffId;
  const {
    loading: loadingUser,
    data: user,
    error: errorUser,
  } = useQuery(FECTH_USER_BYID, {
    variables: {
      userId,
    },
  });
  const {
    loading: loadingStaff,
    data: staff,
    error: errorStaff,
  } = useQuery(FECTH_STAFF_BYID, {
    variables: {
      staffId,
    },
  });
  if (loadingUser || loadingStaff) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator size="large" color="#FDA62A" />
      </View>
    );
  }
  if (errorUser || errorStaff) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>you dont have conversation</Text>
      </View>
    );
  }
  const me = {
    id: route.params.userId,
    name: user.user.fullname,
    email: user.user.email,
    photoUrl: "https://cdn-icons-png.flaticon.com/512/147/147142.png",
    role: "Costumer",
  };

  const other = {
    id: route.params.staffId,
    name: staff.staff.fullname,
    email: staff.staff.email,
    photoUrl: "https://talkjs.com/images/avatar-5.jpg",
    welcomeMessage: "Hey, how can I help?",
    role: "staff",
  };

  const conversationBuilder = TalkRn.getConversationBuilder(
    TalkRn.oneOnOneId(me, other)
  );

  conversationBuilder.setParticipant(me);
  conversationBuilder.setParticipant(other);

  return (
    <TalkRn.Session appId="tAu9iQiX" me={me}>
      <TalkRn.Chatbox conversationBuilder={conversationBuilder} />
    </TalkRn.Session>
  );
}

export default Chat;
