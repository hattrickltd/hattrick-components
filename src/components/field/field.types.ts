export interface IFieldItem {
  positionId: Position;
  behaviour: Behaviour;
}

export interface ITrainingPosition {
  positionId: Position;
  partial: boolean;
  bonus: boolean;
}

export interface IRatingPosition {
  stars: number;
  stamina: number;
  label: string;
}

export const enum Position {
  None = 0,
  Inherit = -1,
  Captain = 19,
  SetPiecesTaker = 20,
  Keeper = 100,
  WingBackRight = 101,
  CentralDefenderRight = 102,
  CentralDefenderMid = 103,
  CentralDefenderLeft = 104,
  WingBackLeft = 105,
  WingerRight = 106,
  InnerMidfieldRight = 107,
  InnerMidfieldMid = 108,
  InnerMidfieldLeft = 109,
  WingerLeft = 110,
  ForwardRight = 111,
  ForwardMid = 112,
  ForwardLeft = 113,
  Old114 = 114,
  Old115 = 115,
  Old116 = 116,
  Old117 = 117,
  Old118 = 118,
  SubKeeper = 200,
  SubCentralDefender = 201,
  SubWingback = 202,
  SubInnerMidfield = 203,
  SubForward = 204,
  SubWinger = 205,
  SubExtra = 206,
  BackupKeeper = 207,
  BackupCentralDefender = 208,
  BackupWingback = 209,
  BackupInnerMidfield = 210,
  BackupForward = 211,
  BackupWinger = 212,
  BackupExtra = 213,
}

export const enum Behaviour {
  Inherit = -1,
  Normal = 0,
  Offensive = 1,
  Defensive = 2,
  TowardsMiddle = 3,
  TowardsWing = 4,
  ExtraForward = 5,
  ExtraInnermidfield = 6,
  ExtraDefender = 7,
  NotPlaying = -1,
}
