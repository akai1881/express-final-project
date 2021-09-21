const ProfileService = require('../services/profileService');

class ProfileController {
  static getOne = async (req, res, next) => {
    try {
      const { id } = req.params;

      const profile = await ProfileService.getOne(id);

      return res.json(profile);
    } catch (error) {
      next(error);
    }
  };

  static create = async (req, res, next) => {
    try {
      let { firstName, lastName, age, gender, phone, userId } = req.body;
      let { img } = req.files;
      const profileData = {
        firstName,
        userId,
        lastName,
        age,
        gender,
        phone,
        img,
      };
      await ProfileService.create(profileData);
      return res.json({ message: 'profile created' });
    } catch (error) {
      next(error);
    }
  };

  static update = async (req, res, next) => {
    try {
      let { firstName, lastName, age, phone, gender, userId } = req.body;
      const { id } = req.params;
      let { img } = req.files;
      await ProfileService.update({ firstName, lastName, age, phone, gender, userId, id, img });
      return res.json({ message: 'updated' });
    } catch (error) {
      next(error);
    }
  };
}

module.exports = ProfileController;
