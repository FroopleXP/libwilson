import Logger from "../impl/Logger";

const logger: Logger = new Logger("test service", true);

logger.debug("Gary!");

logger.error("You've fucked it, Gary!");

