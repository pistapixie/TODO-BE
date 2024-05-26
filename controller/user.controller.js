const User = require("./../model/User")
const bcrypt = require('bcryptjs');

const userController = {};

// 유저 생성
userController.createUser = async (req, res) => {
    try {
        const { email, name, password } = req.body;

        // 이메일 중복 검사
        const user = await User.findOne({ email });
        if (user) {
            throw new Error("이미 가입이 된 유저입니다")
        }

        // 비밀번호 암호화
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);

        // 유저 생성
        const newUser = new User({ email, name, password: hash })
        await newUser.save();
        console.log("### newUser", newUser)

        res.status(200).json({ status: "success" })

    } catch (err) {
        res.status(500).json({ status: "fail", error: err, message: err.message });
    }
};

// 유저 로그인
userController.loginWithEmail = async (req, res) => {
    try {
        // email로 유저 정보 가져오기
        const { email, password } = req.body;
        const user = await User.findOne({ email }, "-createdAt -updatedAt -__v");

        if (user) {

            // 프론트에서 입력받은 비밀번호와 DB에 저장된 비밀번호(해시 값)와 비교
            const isMatch = await bcrypt.compare(password, user.password);

            if (isMatch) {
                // 토큰 발생
                const token = user.generateToken();

                // 응답: 유저 정보 + 토큰 정보
                return res.status(200).json({ status: "success", user, token });
            }
        }

        throw new Error("아이디 또는 비밀번호가 일치하지 않습니다");

    } catch (err) {
        res.status(400).json({ status: "fail", error: err, message: err.message });
    }
};

// _id 값으로 유저 정보 가져오기
userController.getUserData = async (req, res) => {
    try {
        // authController.authenticate에서 넘겨받은 userId
        const { userId } = req;

        const userData = await User.findById(userId)
        console.log("### userData: ", userData)

        if (!userId) {
            throw new Error("유저를 찾을 수 없습니다.");
        }

        return res.status(200).json({ status: "success", userData })

    } catch (err) {
        res.status(400).json({ status: "fail", error: err, message: err.message });
    }
};

module.exports = userController;