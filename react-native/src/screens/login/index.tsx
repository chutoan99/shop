import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import Svg, { Circle, Path, Rect } from "react-native-svg";
import { LoginREsponse } from "../../services/auth/index.response";
import { ApiLogin } from "../../services/auth/index.service";
import styled from "styled-components/native";
import Toast from "react-native-toast-message";
export default function Login() {
  const [loading, setLoading] = useState(false);
  const [payload, setPayload] = useState<any>({
    email: "",
    password: "",
  });
  const handleLogin = async () => {
    try {
      const response: LoginREsponse = await ApiLogin(payload);
      console.log(response, "response");
      if (response.err === 0) {
        // toast.success(ALERT_LOGIN_SUCCESS);
        // localStorage.setItem('token-shopee', response?.access_token ?? '');
        // setTimeout(() => {
        //   navigate('/');
        // }, 2000);
      } else {
        // toast.error(response.msg);
      }
    } catch (error: any) {
      Toast.show({
        type: "success",
        text1: "login thành công",
      });
      // toast.error(error.msg);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Container>
      <StatusBar hidden={true} translucent={true} />
      <Header>
        <HeaderInner>
          <Svg width={25} height={26} viewBox="0 0 25 26" fill="none">
            <Path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M3.16382 13.8782L11.3485 21.1958C11.6888 21.5304 11.6888 22.0729 11.3485 22.4075C11.0073 22.743 10.4554 22.743 10.1142 22.4075L0.33349 13.6633C0.307589 13.6422 0.270971 13.651 0.246856 13.6272C0.0709094 13.4538 -0.00589984 13.2274 0.000352079 13.0003C-0.00589984 12.7731 0.0709094 12.5459 0.246856 12.3724C0.270971 12.3495 0.308482 12.3574 0.334383 12.3372L10.1142 3.59125C10.4554 3.25751 11.0073 3.25751 11.3485 3.59125C11.6888 3.92763 11.6888 4.47007 11.3485 4.80469L3.16382 12.1223H24.1069C24.5999 12.1223 25 12.5159 25 13.0003C25 13.4846 24.5999 13.8782 24.1069 13.8782H3.16382Z"
              fill="#EE4D2D"
            />
          </Svg>
          <Text
            style={{
              color: "#000",
              textAlign: "center",
              fontFamily: "Roboto",
              fontSize: 20,
              fontWeight: "400",
              letterSpacing: -0.24,
            }}>
            Đăng nhập
          </Text>
        </HeaderInner>
        <Svg width={24} height={25} viewBox="0 0 24 25" fill="none">
          <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M20.5 12.5C20.5 14.7543 19.6045 16.9163 18.0104 18.5104C16.4163 20.1045 14.2543 21 12 21C9.74566 21 7.58365 20.1045 5.98959 18.5104C4.39553 16.9163 3.5 14.7543 3.5 12.5C3.5 10.2457 4.39553 8.08365 5.98959 6.48959C7.58365 4.89553 9.74566 4 12 4C14.2543 4 16.4163 4.89553 18.0104 6.48959C19.6045 8.08365 20.5 10.2457 20.5 12.5ZM22 12.5C22 18.023 17.523 22.5 12 22.5C6.477 22.5 2 18.023 2 12.5C2 6.977 6.477 2.5 12 2.5C17.523 2.5 22 6.977 22 12.5ZM11.217 13.52C11.057 13.899 10.977 14.408 10.977 15.046H12.627C12.637 14.355 12.802 13.829 13.121 13.469L14.015 12.598C14.752 11.839 15.12 11.068 15.12 10.286C15.12 9.408 14.846 8.724 14.299 8.234C13.756 7.744 12.998 7.5 12.024 7.5C11.079 7.5 10.319 7.747 9.742 8.241C9.17 8.736 8.88 9.408 8.87 10.258H10.636C10.636 9.859 10.762 9.545 11.014 9.314C11.271 9.079 11.607 8.962 12.024 8.962C12.46 8.962 12.79 9.082 13.012 9.322C13.24 9.557 13.354 9.9 13.354 10.352C13.354 10.692 13.257 11.009 13.064 11.302C12.937 11.494 12.637 11.818 12.162 12.274C11.692 12.725 11.377 13.14 11.217 13.519V13.52ZM11.123 16.601C10.943 16.774 10.854 17.002 10.854 17.285C10.854 17.549 10.939 17.77 11.108 17.948C11.283 18.125 11.53 18.214 11.85 18.214C12.17 18.214 12.416 18.125 12.59 17.948C12.6763 17.861 12.7441 17.7574 12.7893 17.6434C12.8345 17.5295 12.8562 17.4075 12.853 17.285C12.857 17.1597 12.835 17.0348 12.7886 16.9184C12.7421 16.8019 12.6721 16.6962 12.583 16.608C12.404 16.426 12.16 16.335 11.85 16.335C11.544 16.335 11.302 16.424 11.123 16.601Z"
            fill="#EE4D2D"
          />
        </Svg>
      </Header>
      <Body>
        <LogoApp>
          <Svg width={50} height={55} viewBox="0 0 50 55" fill="none">
            <Path
              d="M32.8174 40.5286C32.5199 43.0082 31.0142 45.0008 28.6879 45.9926C27.3896 46.5516 25.6494 46.8491 24.2699 46.75C22.124 46.6688 20.1043 46.1459 18.2379 45.1901C17.5797 44.8475 16.5879 44.1713 15.8216 43.5311C15.6322 43.3688 15.6052 43.2696 15.7404 43.0803C15.8035 42.9811 15.9297 42.7918 16.2093 42.386C16.624 41.7819 16.6691 41.7098 16.7142 41.6377C16.8494 41.4393 17.0568 41.4213 17.2642 41.5836C17.2912 41.6016 17.2912 41.6016 17.3093 41.6196C17.3363 41.6467 17.3363 41.6467 17.4175 41.7098C17.4986 41.7729 17.5527 41.809 17.5707 41.827C19.5814 43.3959 21.9166 44.2975 24.2789 44.3967C27.5609 44.3516 29.9232 42.8729 30.347 40.6008C30.8068 38.1122 28.8502 35.9573 25.0183 34.7491C23.8191 34.3795 20.7896 33.1622 20.2306 32.8377C17.6068 31.2959 16.3806 29.2762 16.5609 26.7877C16.8224 23.3344 20.0322 20.7647 24.0806 20.7467C25.8838 20.7467 27.6961 21.1164 29.4273 21.8467C30.0494 22.1082 31.1404 22.7032 31.5191 22.9918C31.7355 23.1541 31.7806 23.3344 31.6543 23.5418C31.5912 23.659 31.474 23.8393 31.2306 24.227C30.906 24.7409 30.897 24.759 30.8248 24.8762C30.6986 25.0655 30.5453 25.0836 30.3199 24.9393C28.4625 23.695 26.3978 23.0639 24.1347 23.0188C21.3125 23.0729 19.2027 24.75 19.0675 27.0401C19.0314 29.1049 20.5732 30.6106 23.9183 31.7557C30.7076 33.9377 33.3043 36.4983 32.8174 40.5286ZM24.4322 4.89586C28.8502 4.89586 32.4568 9.08848 32.6281 14.336H16.2453C16.4076 9.08848 20.0142 4.89586 24.4322 4.89586ZM47.3068 15.3278C47.3068 14.7778 46.874 14.336 46.333 14.336H46.315H35.7117C35.4502 7.40242 30.5002 1.87537 24.4322 1.87537C18.3642 1.87537 13.4232 7.40242 13.1617 14.336H2.52237C1.9904 14.345 1.56663 14.7868 1.56663 15.3278C1.56663 15.3549 1.56663 15.3729 1.56663 15.4H1.55762L3.07237 48.8147C3.07237 48.9139 3.08139 49.0041 3.08139 49.1032C3.08139 49.1213 3.0904 49.1393 3.0904 49.1663V49.2295L3.09942 49.2385C3.32483 51.5647 5.0109 53.4311 7.31008 53.5213V53.5303H41.0494C41.0584 53.5303 41.0765 53.5303 41.0945 53.5303C41.1125 53.5303 41.1216 53.5303 41.1396 53.5303H41.2117V53.5213C43.547 53.4582 45.4404 51.5647 45.6388 49.2114L45.6478 49.1754C45.6478 49.1483 45.6478 49.1303 45.6478 49.1032C45.6478 49.0401 45.6568 48.986 45.6568 48.9229L47.3068 15.3729C47.3068 15.3639 47.3068 15.3459 47.3068 15.3278Z"
              fill="#EE4D2D"
              stroke="#EE4D2D"
              strokeWidth="0.901639"
            />
          </Svg>
        </LogoApp>
        <FormLogin>
          <InputWrapper>
            <View style={styles.InputInner}>
              <View style={{ paddingRight: 24 }}>
                <Svg width={28} height={29} viewBox="0 0 28 29" fill="none">
                  <Path
                    d="M16.7019 16.95C16.5733 17.0344 16.4692 17.1512 16.4001 17.2886C16.331 17.4261 16.2993 17.5793 16.3083 17.7329C16.3173 17.8864 16.3666 18.0349 16.4513 18.1633C16.536 18.2918 16.653 18.3956 16.7906 18.4644L23.9854 22.0624C24.4801 22.3085 24.7916 22.8137 24.7916 23.3667V25.2917H3.20825V23.3667C3.20825 22.8137 3.52092 22.3085 4.01442 22.0624L11.2093 18.4644C11.3467 18.3956 11.4635 18.2919 11.5481 18.1636C11.6327 18.0354 11.682 17.8871 11.6911 17.7337C11.7003 17.5804 11.6688 17.4273 11.6 17.2899C11.5312 17.1526 11.4274 17.0357 11.2991 16.9512C9.79175 15.9595 8.51075 14.129 8.51075 12.3779V9.19871C8.51075 7.69254 8.98559 6.32287 9.87692 5.34054C10.7566 4.37104 12.1018 3.70837 13.9999 3.70837C15.8981 3.70837 17.2433 4.37104 18.1229 5.33937C19.0131 6.32171 19.4879 7.69137 19.4879 9.19754V12.379C19.4879 14.1337 18.2128 15.9607 16.7019 16.95Z"
                    stroke="black"
                    strokeOpacity="0.65"
                    strokeWidth="1.375"
                    strokeLinecap="square"
                    strokeLinejoin="round"
                  />
                </Svg>
              </View>
              <TextInput
                style={styles.Input}
                placeholder="Email/Telephone/Username"
                onChange={(e) =>
                  setPayload((prev: any) => {
                    return {
                      ...prev,
                      email: e.nativeEvent?.text,
                    };
                  })
                }></TextInput>
            </View>
            <BorderHorizon></BorderHorizon>
          </InputWrapper>
          <InputWrapper>
            <View style={styles.InputInner}>
              <View style={{ paddingRight: 24 }}>
                <Svg width={28} height={28} viewBox="0 0 28 28" fill="none">
                  <Path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M9.04991 10.9387C9.05225 11.186 9.05575 11.4287 9.05575 11.6667H8.18075H18.9444C18.9444 11.4287 18.9479 11.186 18.9502 10.9387C18.9677 9.55733 18.9852 8.06283 18.4952 6.80867C18.2222 6.10867 17.8011 5.52533 17.1407 5.10533C16.4711 4.6795 15.4841 4.375 14.0001 4.375C12.5172 4.375 11.5279 4.67833 10.8594 5.10417C10.1991 5.52417 9.77792 6.1075 9.50492 6.8075C9.01492 8.064 9.03241 9.55733 9.04991 10.9387ZM7.29875 11.0355C7.30225 11.263 7.30575 11.4742 7.30575 11.6667H7.00008C6.38124 11.6667 5.78775 11.9125 5.35017 12.3501C4.91258 12.7877 4.66675 13.3812 4.66675 14V23.3333C4.66675 23.9522 4.91258 24.5457 5.35017 24.9832C5.78775 25.4208 6.38124 25.6667 7.00008 25.6667H21.0001C21.6189 25.6667 22.2124 25.4208 22.65 24.9832C23.0876 24.5457 23.3334 23.9522 23.3334 23.3333V14C23.3334 13.3812 23.0876 12.7877 22.65 12.3501C22.2124 11.9125 21.6189 11.6667 21.0001 11.6667H20.6944C20.6944 11.4742 20.6979 11.263 20.7014 11.0367C20.7224 9.67633 20.7527 7.77817 20.1251 6.17167C19.7436 5.194 19.1101 4.28283 18.0799 3.62833C17.0567 2.97733 15.7174 2.625 14.0001 2.625C12.2827 2.625 10.9434 2.97733 9.92025 3.62833C8.89008 4.28167 8.25658 5.19283 7.87508 6.17167C7.24741 7.77817 7.27775 9.6775 7.29875 11.0367V11.0355ZM21.0001 13.4167H7.00008C6.84537 13.4167 6.697 13.4781 6.5876 13.5875C6.47821 13.6969 6.41675 13.8453 6.41675 14V23.3333C6.41675 23.488 6.47821 23.6364 6.5876 23.7458C6.697 23.8552 6.84537 23.9167 7.00008 23.9167H21.0001C21.1548 23.9167 21.3032 23.8552 21.4126 23.7458C21.522 23.6364 21.5834 23.488 21.5834 23.3333V14C21.5834 13.8453 21.522 13.6969 21.4126 13.5875C21.3032 13.4781 21.1548 13.4167 21.0001 13.4167ZM14.0001 16.3333C13.6907 16.3333 13.3939 16.4563 13.1751 16.675C12.9563 16.8938 12.8334 17.1906 12.8334 17.5V19.8333C12.8334 20.1428 12.9563 20.4395 13.1751 20.6583C13.3939 20.8771 13.6907 21 14.0001 21C14.3095 21 14.6062 20.8771 14.825 20.6583C15.0438 20.4395 15.1667 20.1428 15.1667 19.8333V17.5C15.1667 17.1906 15.0438 16.8938 14.825 16.675C14.6062 16.4563 14.3095 16.3333 14.0001 16.3333Z"
                    fill="black"
                    fillOpacity="0.54"
                  />
                </Svg>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flex: 1,
                  paddingRight: 10,
                }}>
                <TextInput
                  style={styles.Input}
                  secureTextEntry
                  placeholder="Password"
                  onChange={(e) =>
                    setPayload((prev: any) => {
                      return {
                        ...prev,
                        password: e.nativeEvent?.text,
                      };
                    })
                  }></TextInput>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 8,
                    justifyContent: "flex-end",
                  }}>
                  <View>
                    <Svg width={25} height={29} viewBox="0 0 25 29" fill="none">
                      <Path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M3.08217 8.93079C3.16208 8.86121 3.25255 8.81132 3.34841 8.78398C3.44428 8.75665 3.54366 8.75239 3.64088 8.77147C3.73811 8.79054 3.83127 8.83257 3.91505 8.89516C3.99883 8.95774 4.07159 9.03965 4.12917 9.13621C5.30717 11.1143 7.51117 14.8033 12.5202 14.8033C17.5302 14.8033 19.7332 11.1143 20.9112 9.13621C21.0275 8.94104 21.2032 8.8097 21.3996 8.77106C21.5961 8.73242 21.7972 8.78966 21.9587 8.93019C22.1202 9.07072 22.2289 9.28302 22.2609 9.52039C22.2928 9.75776 22.2455 10.0008 22.1292 10.1959L22.1252 10.2032C21.6552 10.991 20.9842 12.1172 20.0082 13.2071C20.0227 13.2225 20.0367 13.2386 20.0502 13.2554L22.0502 15.6721C22.1827 15.8439 22.2548 16.0711 22.2513 16.3059C22.2479 16.5407 22.1692 16.7647 22.0318 16.9307C21.8944 17.0968 21.709 17.1919 21.5147 17.196C21.3204 17.2001 21.1323 17.113 20.9902 16.9529L18.9902 14.5363C18.9387 14.4746 18.8949 14.4041 18.8602 14.3272C17.959 15.091 16.9609 15.6725 15.9052 16.0491L16.7322 19.0458C16.7952 19.2738 16.7806 19.5227 16.6917 19.7377C16.6028 19.9528 16.4469 20.1164 16.2582 20.1925C16.0695 20.2686 15.8635 20.251 15.6855 20.1436C15.5075 20.0362 15.3722 19.8477 15.3092 19.6197L14.4332 16.4442C13.8 16.5594 13.1605 16.6164 12.5202 16.6146C11.8402 16.6146 11.2032 16.5542 10.6082 16.4454L9.73217 19.6197C9.70203 19.7341 9.6534 19.8401 9.58908 19.9315C9.52477 20.023 9.44606 20.0981 9.35752 20.1525C9.26899 20.2069 9.17239 20.2395 9.07333 20.2485C8.97428 20.2574 8.87475 20.2425 8.78051 20.2045C8.68627 20.1666 8.59921 20.1064 8.52438 20.0275C8.44954 19.9486 8.38842 19.8525 8.34457 19.7448C8.30072 19.6371 8.27501 19.52 8.26894 19.4002C8.26286 19.2804 8.27654 19.1603 8.30917 19.047L9.13617 16.0491C8.08009 15.6726 7.08172 15.0911 6.18017 14.3272C6.14543 14.4041 6.10164 14.4745 6.05017 14.5363L4.05017 16.9529C3.98151 17.042 3.89871 17.1134 3.80671 17.1629C3.71471 17.2124 3.6154 17.2391 3.5147 17.2412C3.41399 17.2434 3.31396 17.221 3.22058 17.1754C3.12719 17.1298 3.04235 17.062 2.97113 16.9759C2.89992 16.8899 2.84377 16.7874 2.80605 16.6745C2.76833 16.5617 2.7498 16.4408 2.75158 16.3191C2.75336 16.1974 2.7754 16.0774 2.81639 15.9663C2.85738 15.8551 2.91649 15.7551 2.99017 15.6721L4.99017 13.2554C5.00366 13.2387 5.01767 13.2225 5.03217 13.2071C4.05617 12.1172 3.38517 10.991 2.91517 10.2032L2.91117 10.1959C2.85358 10.0994 2.8123 9.99005 2.78967 9.87421C2.76705 9.75838 2.76353 9.63829 2.77932 9.52081C2.7951 9.40333 2.82989 9.29076 2.88168 9.18952C2.93347 9.08829 3.00226 9.00037 3.08217 8.93079Z"
                        fill="black"
                        fillOpacity="0.54"
                      />
                    </Svg>
                  </View>
                </View>
              </View>
            </View>
            <BorderHorizon></BorderHorizon>
          </InputWrapper>
        </FormLogin>
        <ButtonWrapper>
          <TouchableOpacity onPress={handleLogin}>
            <ButtonText>Đăng nhập</ButtonText>
          </TouchableOpacity>
        </ButtonWrapper>
        <ContentOptionWrapper>
          <ContentOptionText>Đăng ký</ContentOptionText>
          <ContentOptionText>Quên mật khẩu</ContentOptionText>
        </ContentOptionWrapper>
        <ContentWrapper>
          <ContentHr></ContentHr>
          <Text>HOẶC</Text>
          <ContentHr></ContentHr>
        </ContentWrapper>
        <SocialWrapper>
          <SocialItem>
            <SocialItemInner>
              <Svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <Path
                  d="M16.8206 2.68701C15.8406 1.773 14.6869 1.06529 13.428 0.605909C12.1691 0.146532 10.8307 -0.0551335 9.49237 0.0128926C8.15402 0.0809187 6.84299 0.417249 5.63718 1.0019C4.43136 1.58656 3.35535 2.4076 2.47308 3.41627L5.21377 5.81352C5.77479 5.17213 6.459 4.65004 7.22576 4.27827C7.99252 3.9065 8.82617 3.69263 9.67721 3.64938C10.5282 3.60612 11.3793 3.73436 12.1798 4.02647C12.9803 4.31857 13.7139 4.7686 14.3371 5.3498L16.8206 2.68701Z"
                  fill="#E13B2B"
                />
                <Path
                  d="M0.515878 13.1704C1.01814 14.6729 1.87019 16.0346 3.00184 17.1432C4.13348 18.2519 5.51234 19.0758 7.02483 19.5472C8.53731 20.0185 10.1401 20.1237 11.7013 19.8542C13.2624 19.5847 14.7372 18.9481 16.004 17.997L13.8272 15.0976C13.0197 15.7039 12.0796 16.1097 11.0845 16.2815C10.0893 16.4533 9.06762 16.3862 8.1035 16.0857C7.13939 15.7853 6.26045 15.2601 5.53909 14.5534C4.81773 13.8467 4.2746 12.9787 3.95444 12.0209L0.515878 13.1704Z"
                  fill="#35A956"
                />
                <Path
                  d="M2.46526 3.42522C1.29863 4.76218 0.508749 6.38549 0.176678 8.12855C-0.155394 9.8716 -0.0176934 11.6716 0.575647 13.3439L4.02997 12.1182C3.65411 11.0589 3.56688 9.91866 3.77724 8.81449C3.9876 7.71033 4.48796 6.68201 5.22699 5.83509L2.46526 3.42522Z"
                  fill="#FDB803"
                />
                <Path
                  d="M15.936 18.0476C17.1936 17.12 18.2163 15.9105 18.9221 14.5163C19.6278 13.122 19.997 11.5818 20 10.0191L16.3678 10.0121C16.3659 11.0072 16.1308 11.988 15.6814 12.8759C15.232 13.7637 14.5808 14.5339 13.78 15.1246L15.936 18.0476Z"
                  fill="#4188F0"
                />
                <Path
                  d="M11.1113 7.22223H20.0002V10.0311L11.1113 10V7.22223Z"
                  fill="#4188F0"
                />
              </Svg>
            </SocialItemInner>
            <SocialItemText>Đăng nhập với Google</SocialItemText>
          </SocialItem>
          <SocialItem>
            <SocialItemInner>
              <Svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <Circle cx="10" cy="10" r="10" fill="#1D79E3" />
                <Path
                  d="M8.33325 9.16669H11.1879V20H8.33325V9.16669Z"
                  fill="white"
                />
                <Path
                  d="M8.33325 8.33331C8.33325 5.57189 10.5718 3.33331 13.3333 3.33331V6.24998C12.1498 6.24998 11.1904 7.20937 11.1904 8.39284V9.16665H8.33325V8.33331Z"
                  fill="white"
                />
                <Rect
                  x="5.83325"
                  y="10"
                  width="8.33333"
                  height="2.5"
                  fill="white"
                />
              </Svg>
            </SocialItemInner>
            <SocialItemText>Đăng nhập với Facebook</SocialItemText>
          </SocialItem>
        </SocialWrapper>
      </Body>
    </Container>
  );
}
const Container = styled.SafeAreaView`
  width: 100%;
  flex: 1;
`;
const Header = styled.View`
  flex-direction: row;
  padding: 0 14px;
  justify-content: space-between;
  align-items: center;
  height: 44px;
  background-color: #fff;
`;
const HeaderInner = styled.View`
  flex-direction: row;
  gap: 15px;
`;
const Body = styled.View`
  background-color: #fff;
  display: flex;
  flex: 1;
`;
const LogoApp = styled.View`
  margin-bottom: 45px;
  margin-top: 62px;
  padding-right: 5px;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;
const FormLogin = styled.View`
  display: flex;
  gap: 10px;
`;
const InputWrapper = styled.View`
  padding-left: 25px;
  padding-right: 25px;
  padding-bottom: 10px;
  gap: 10px;
  display: flex;
`;
const SocialWrapper = styled.View`
  margin-bottom: 20px;
  margin-left: 25px;
  margin-right: 25px;
  display: flex;
  gap: 20px;
  align-items: center;
`;
const SocialItem = styled.View`
  background-color: rgba(196, 196, 196, 0);
  padding: 13px 25px;
  width: 100%;
  flex-direction: row;
  border: 1px solid rgba(0, 0, 0, 0.26);
  background: #fff;
  border-radius: 5px;
  align-items: center;
`;
const SocialItemInner = styled.View`
  padding-right: 50px;
`;
const SocialItemText = styled.Text`
  color: rgba(0, 0, 0, 0.87);
  font-family: "Roboto";
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 1.54px;
`;
const BorderHorizon = styled.View`
  width: 100%;
  border-bottom-width: 1px;
  border-bottom-color: #cbcbcb;
`;
const ButtonWrapper = styled.View`
  padding-left: 26px;
  padding-right: 26px;
  padding-top: 15px;
  padding-bottom: 16px;
  width: 100%;
`;
const ButtonText = styled.Text`
  padding-top: 15px;
  padding-bottom: 15px;
  border-radius: 5px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #e8e8e8;
  color: rgba(0, 0, 0, 0.26);
  text-align: center;
  font-family: "Roboto";
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
`;
const ContentWrapper = styled.View`
  flex-direction: row;
  gap: 15px;
  align-items: center;
  justify-content: center;
  padding-top: 25px;
  padding-bottom: 20px;
`;
const ContentHr = styled.View`
  border-color: rgba(0, 0, 0, 0.12);
  border-width: 1px;
  width: 96px;
`;
const ContentOptionWrapper = styled.View`
  padding-left: 25px;
  padding-right: 25px;
  padding-bottom: 10px;
  gap: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const ContentOptionText = styled.Text`
  color: #247ac7;
  font-family: "Roboto";
  font-size: 15px;
  font-style: normal;
  font-weight: 300;
  letter-spacing: -0.24px;
`;
const styles = StyleSheet.create({
  InputInner: {
    paddingLeft: 11,
    display: "flex",
    flexDirection: "row",
  },
  Input: {
    width: "100%",
    color: "#000",
    fontFamily: "Roboto",
    fontSize: 18,
    fontStyle: "normal",
    fontWeight: "400",
    letterSpacing: -0.2,
  },
});
