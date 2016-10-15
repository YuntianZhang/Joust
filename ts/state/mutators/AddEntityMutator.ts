import GameState from "../GameState";
import GameStateMutator from "../GameStateMutator";
import Entity from "../../Entity";
import AddDiffsMutator from "./AddDiffsMutator";
import {GameStateDiff} from "../../interfaces";
import {Zone, GameTag, Mulligan, Step} from "../../enums";

export default class AddEntityMutator implements GameStateMutator {
	constructor(public entity: Entity) {
	}

	public applyTo(state: GameState): GameState {
		if (!this.entity) {
			console.error('Cannot add null entity');
			return state;
		}

		let entity = this.entity;

		let id = +entity.id;
		if (id < 1) {
			console.error('Cannot add entity: Invalid entity id');
			return state;
		}

		if (this.isCoin(entity, state)) {
			entity = entity.setCardId("GAME_005");
		}

		let entities = state.entities;
		if (entities.has(id)) {
			console.warn('Overwriting entity with id #' + id);
			// we might have a stale entity at the old location in the entity tree
		}

		entities = entities.set(id, entity);

		let entityTree = state.entityTree;
		entityTree = entityTree.setIn([entity.getController(), entity.getZone(), id], entity);

		let diffs: GameStateDiff[] = [];
		entity.getTags().forEach((value: number, tag: string) => {
			diffs.push({
				entity: id,
				tag: +tag,
				previous: null,
				current: value
			});
		});

		// we always mutate the GameState when we add an entity
		state = new GameState(entities, entityTree, state.options, state.optionTree, state.time, state.choices, state.descriptors, state.diffs);

		return state.apply(new AddDiffsMutator(diffs));
	}

	private isCoin(potentialCoin: Entity, state: GameState): boolean {
		let player = state.getPlayer(potentialCoin.getTag(GameTag.CONTROLLER));
		return (
			potentialCoin.getTag(GameTag.ZONE) === Zone.HAND &&
			potentialCoin.getTag(GameTag.ZONE_POSITION) === 5 &&
			state.game.getTag(GameTag.MULLIGAN_STATE) === Mulligan.INVALID &&
			state.game.getTag(GameTag.STEP) === Step.INVALID &&
			player && !player.getTag(GameTag.FIRST_PLAYER)
		);
	}
}
