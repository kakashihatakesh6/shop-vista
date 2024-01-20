export default function handler(req, res) {
  let pincodes ={
    "721302": ["Kharagpur", "West Bengal"],
    "110003": ["Delhi", "Delhi"],
    "560017": ["Banglore", "Karnataka"],
    "495001": ["Bilaspur", "Chhattisgarh"],
    "324005": ["Kota", "Rajasthan"],
    "494444": ["Bijapur", "Chhattisgarh"],
    "492001": ["Raipur", "Chhattisgarh"],

  }
    res.status(200).json(pincodes)
  }
  