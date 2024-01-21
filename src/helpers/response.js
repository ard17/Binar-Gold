const Success = (data) => {
  return { data, status: "Success" };
};
const Failed = (errors) => {
  return { errors, status: "Failed" };
};

module.exports = { Success, Failed };
