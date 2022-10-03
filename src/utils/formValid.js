export const formValid = (name, value, comparison) => {
  
  if (name === "title") {
    if (value.trim() === "") {
      return "그룹명을 입력해 주세요";
    } else return "";
  }

  if (name === "content") {
    if (value.trim() === "") {
      return"그룹 소개를 입력해주세요";
    } else return"";
  }

  if (name === "limitScore") {
    if (value === "" || parseInt(value) < parseInt(comparison)) {
      return"목표달성 수를 참가인원 수 이상, 100개 이하로 입력해 주세요.";
    } else return"";
  }

  if (name === "limitParticipants") {
    if (value === "") {
      return("참가인원을 입력해 주세요(10명 이내)");
    } else return"";
  }
};
