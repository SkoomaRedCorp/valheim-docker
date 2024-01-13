use crate::mods::bepinex::{BepInExEnvironment, ModInfo};
use serde::{Deserialize, Serialize};

#[derive(Debug, Deserialize, Serialize)]
pub struct BepInExInfo {
  pub enabled: bool,
  pub(crate) mods: Vec<ModInfo>,
}

impl BepInExInfo {
  pub(crate) fn new() -> BepInExInfo {
    let env: BepInExEnvironment = BepInExEnvironment::new();
    BepInExInfo {
      enabled: env.is_installed(),
      mods: env.retrive_mod_manifest_info(),
    }
  }
  pub fn disabled() -> BepInExInfo {
    BepInExInfo {
      enabled: false,
      mods: vec![],
    }
  }
}
